import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { MercadoPagoService } from '@/lib/mercadopago'

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
    items: { id: string; qty: number }[]
    contact: { nombre: string; email: string; telefono: string }
    shipping: { calle: string; ciudad: string; provincia: string; codigoPostal: string }
  }

  if (!items?.length || !contact?.email || !shipping?.calle) {
    return Response.json({ error: 'Datos incompletos' }, { status: 400 })
  }

  // Validate all quantities
  for (const item of items) {
    if (!Number.isInteger(item.qty) || item.qty < 1) {
      return Response.json({ error: `Cantidad inválida para producto ${item.id}` }, { status: 400 })
    }
  }

  // Server-side price validation against Supabase — never trust client prices
  const db = createServiceClient()
  const ids = items.map((i) => i.id)
  const { data: dbProducts, error: dbError } = await db
    .from('products')
    .select('id, name, price')
    .in('id', ids)

  if (dbError || !dbProducts?.length) {
    return Response.json({ error: 'Error al validar productos' }, { status: 400 })
  }

  const validated: { id: string; name: string; price: number; qty: number }[] = []
  for (const item of items) {
    const product = dbProducts.find((p) => p.id === item.id)
    if (!product) {
      return Response.json({ error: `Producto ${item.id} no encontrado` }, { status: 400 })
    }
    validated.push({ id: product.id, name: product.name, price: product.price, qty: item.qty })
  }

  const subtotal = validated.reduce((sum, p) => sum + p.price * p.qty, 0)
  const total = subtotal + SHIPPING_COST

  // Create order in Supabase
  let orderId = `tmp-${Date.now()}`
  try {
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
        validated.map((p) => ({
          order_id: orderId,
          product_id: p.id,
          name: p.name,
          price: p.price,
          qty: p.qty,
        }))
      )
    }
  } catch {
    // DB not configured — proceed with temp orderId
  }

  // Create MercadoPago preference
  try {
    const mpItems = validated.map((p) => ({
      id: p.id,
      title: p.name,
      quantity: p.qty,
      unit_price: p.price,
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
