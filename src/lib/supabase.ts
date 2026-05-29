import { createClient } from '@supabase/supabase-js'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseUrl = (rawUrl.startsWith('http://') || rawUrl.startsWith('https://'))
  ? rawUrl
  : 'https://placeholder-url.supabase.co'

const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseAnonKey = rawKey ? rawKey : 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
