import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { MercadoPagoService } from '@/lib/mercadopago'
import { products, type Product } from '@/lib/constants'

const SHIPPING_COST = 3500 // TODO: integrate OCAService.calculateShipping

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder'
  )
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { items, contact, shipping } = body as {
    items: { id: number; qty: number }[]
    contact: { nombre: string; email: string; telefono: string }
    shipping: { calle: string; ciudad: string; provincia: string; codigoPostal: string }
  }

  if (!items?.length || !contact?.email || !shipping?.calle) {
    return Response.json({ error: 'Datos incompletos' }, { status: 400 })
  }

  // Server-side price validation — never trust client prices
  const validated: { product: Product; qty: number }[] = []
  for (const item of items) {
    const product = products.find((p) => p.id === item.id)
    if (!product) {
      return Response.json({ error: `Producto ${item.id} no encontrado` }, { status: 400 })
    }
    if (!Number.isInteger(item.qty) || item.qty < 1) {
      return Response.json({ error: `Cantidad inválida para ${product.name}` }, { status: 400 })
    }
    validated.push({ product, qty: item.qty })
  }

  const subtotal = validated.reduce((sum, { product, qty }) => sum + product.price * qty, 0)
  const total = subtotal + SHIPPING_COST

  // Create order in Supabase (best-effort; continues with temp ID if DB not configured)
  let orderId = `tmp-${Date.now()}`
  try {
    const db = createServiceClient()
    const { data: order } = await db
      .from('orders')
      .insert({
        email: contact.email,
        status: 'pending',
        subtotal,
        shipping_cost: SHIPPING_COST,
        total,
        contact: { nombre: contact.nombre, telefono: contact.telefono },
        shipping_address: shipping,
      })
      .select('id')
      .single()

    if (order?.id) {
      orderId = order.id
      await db.from('order_items').insert(
        validated.map(({ product, qty }) => ({
          order_id: orderId,
          product_id: product.id,
          name: product.name,
          price: product.price,
          qty,
        }))
      )
    }
  } catch {
    // DB not configured yet — proceed with temp orderId
  }

  // Create MercadoPago preference
  try {
    const mpItems = validated.map(({ product, qty }) => ({
      id: String(product.id),
      title: product.name,
      quantity: qty,
      unit_price: product.price,
      currency_id: 'ARS',
    }))

    const preference = await MercadoPagoService.createPreference(mpItems, orderId)
    return Response.json({ init_point: preference.init_point, orderId })
  } catch (err) {
    console.error('MercadoPago error:', err)
    return Response.json(
      { error: 'Error al conectar con MercadoPago. Verificá la configuración de MERCADOPAGO_ACCESS_TOKEN.' },
      { status: 500 }
    )
  }
}
