import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder'
  )
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const token = request.headers.get('authorization')?.replace('Bearer ', '') ?? ''
  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const db = createServiceClient()

  const { data: { user }, error: authError } = await db.auth.getUser(token)
  if (authError || !user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: order, error } = await db
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', id)
    .eq('email', user.email)
    .single()

  if (error || !order) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  return Response.json({ order })
}
