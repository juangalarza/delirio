import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder'
  )
}

export async function GET(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '') ?? ''
  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const db = createServiceClient()

  const { data: { user }, error: authError } = await db.auth.getUser(token)
  if (authError || !user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: orders } = await db
    .from('orders')
    .select('id, status, total, subtotal, shipping_cost, created_at, contact, shipping_address')
    .eq('email', user.email)
    .order('created_at', { ascending: false })
    .limit(50)

  return Response.json({ orders: orders ?? [] })
}
