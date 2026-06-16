import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
    { auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false } }
  )
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const slug = searchParams.get('slug')
    const exclude = searchParams.get('exclude')
    const fields = searchParams.get('fields') || '*'
    const db = createServiceClient()

    if (slug) {
      const { data, error } = await db.from('products').select('*').eq('slug', slug).single()
      if (error) return Response.json({ error: error.message }, { status: 404 })
      return Response.json({ data })
    }

    let query = db.from('products').select(fields).order('created_at', { ascending: true })
    if (exclude) query = query.neq('id', exclude)
    if (limit) query = query.limit(Number(limit))
    const { data, error } = await query
    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json({ data })
  } catch (err: any) {
    return Response.json({ error: err.message || 'Error interno del servidor' }, { status: 500 })
  }
}
