import { NextRequest } from 'next/server'
import { createHmac } from 'crypto'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { createClient } from '@supabase/supabase-js'
import { EmailService } from '@/lib/resend'

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder'
  )
}

function getMpClient() {
  return new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN ?? '',
    options: { timeout: 5000 },
  })
}

// Map MercadoPago payment status to our order status
function mapStatus(mpStatus: string): 'pending' | 'paid' | 'rejected' {
  if (mpStatus === 'approved') return 'paid'
  if (mpStatus === 'rejected' || mpStatus === 'cancelled') return 'rejected'
  return 'pending'
}

// Validate MP webhook signature when MERCADOPAGO_WEBHOOK_SECRET is configured.
// Header format: x-signature: ts=<ts>,v1=<hash>
// Signed payload: id:<dataId>;request-id:<xRequestId>;ts:<ts>
function validateSignature(request: NextRequest, dataId: string): boolean {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET
  if (!secret) return true // skip validation when not configured

  const xSignature = request.headers.get('x-signature') ?? ''
  const xRequestId = request.headers.get('x-request-id') ?? ''

  const parts = Object.fromEntries(
    xSignature.split(',').map((part) => part.split('=') as [string, string])
  )
  const ts = parts['ts']
  const v1 = parts['v1']
  if (!ts || !v1) return false

  const payload = `id:${dataId};request-id:${xRequestId};ts:${ts}`
  const expected = createHmac('sha256', secret).update(payload).digest('hex')
  return expected === v1
}

export async function POST(request: NextRequest) {
  let body: { type?: string; data?: { id?: string | number } } = {}
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // MercadoPago sends topic=payment&id=<id> as query params for IPN,
  // and { type: "payment", data: { id } } in the body for webhooks.
  const url = new URL(request.url)
  const topic = body.type ?? url.searchParams.get('topic') ?? ''
  const rawId = body.data?.id ?? url.searchParams.get('id') ?? ''
  const paymentId = String(rawId)

  if (topic !== 'payment' || !paymentId) {
    // Acknowledge non-payment notifications silently (merchant_order, etc.)
    return Response.json({ received: true })
  }

  if (!validateSignature(request, paymentId)) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }

  // Fetch payment details from MercadoPago
  let payment: { status?: string; external_reference?: string; id?: string | number }
  try {
    const mp = new Payment(getMpClient())
    payment = await mp.get({ id: Number(paymentId) })
  } catch (err) {
    console.error('[webhook/mp] Payment fetch error:', err)
    return Response.json({ error: 'Failed to fetch payment' }, { status: 500 })
  }

  const mpStatus = payment.status ?? 'pending'
  const orderId = payment.external_reference
  const orderStatus = mapStatus(mpStatus)

  if (!orderId) {
    console.warn('[webhook/mp] No external_reference on payment', paymentId)
    return Response.json({ received: true })
  }

  // Skip temp orders that were never persisted to DB
  if (orderId.startsWith('tmp-')) {
    console.info('[webhook/mp] Temp order, skipping DB update:', orderId)
    return Response.json({ received: true })
  }

  // Update order in Supabase
  try {
    const db = createServiceClient()
    const { data: order, error } = await db
      .from('orders')
      .update({
        status: orderStatus,
        mp_payment_id: String(payment.id ?? paymentId),
      })
      .eq('id', orderId)
      .select('email')
      .single()

    if (error) {
      console.error('[webhook/mp] DB update error:', error)
      // Still return 200 so MP doesn't retry — we log the issue
    }

    // Send confirmation email only on first approval
    if (orderStatus === 'paid' && order?.email) {
      await EmailService.sendConfirmation(order.email, orderId)
    }
  } catch (err) {
    console.error('[webhook/mp] DB error:', err)
    // Return 200 regardless — MP retries on non-2xx, which would cause duplicates
  }

  return Response.json({ received: true })
}
