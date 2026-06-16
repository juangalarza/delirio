'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, LogOut, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Orbs } from '@/components/Orbs'
import { formatPrice } from '@/lib/utils'
import type { User } from '@supabase/supabase-js'

type Order = {
  id: string
  status: 'pending' | 'paid' | 'rejected'
  total: number
  created_at: string
}

const STATUS: Record<string, { label: string; cls: string }> = {
  pending:  { label: 'Pendiente',  cls: 'bg-amber-50 text-amber-600 border-amber-200' },
  paid:     { label: 'Confirmado', cls: 'bg-primary/10 text-primary border-primary/20' },
  rejected: { label: 'Rechazado', cls: 'bg-red-50 text-red-500 border-red-200' },
}

export default function CuentaPage() {
  const router = useRouter()
  const [user, setUser]     = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace('/login'); return }
      setUser(session.user)

      try {
        const res = await fetch('/api/cuenta/orders', {
          headers: { Authorization: `Bearer ${session.access_token}` },
        })
        const json = await res.json()
        setOrders(json.orders ?? [])
      } catch {
        // DB not configured — show empty state
      }
      setLoading(false)
    }
    load()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Orbs /><Navbar staticLogo />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </main>
        <Footer />
      </div>
    )
  }

  const displayName =
    user?.user_metadata?.display_name ?? user?.email?.split('@')[0] ?? 'Usuario'

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar staticLogo />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between mb-10"
          >
            <div>
              <p className="text-[11px] tracking-[0.3em] text-primary font-condensed mb-1">MI CUENTA</p>
              <h1 className="text-3xl font-serif text-foreground">Hola, {displayName}</h1>
              <p className="text-foreground/40 font-sans text-sm mt-1">{user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-[11px] tracking-[0.2em] font-condensed text-foreground/40 hover:text-foreground transition-colors border border-black/10 rounded-sm px-4 py-2.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              CERRAR SESIÓN
            </button>
          </motion.div>

          {/* Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-[11px] tracking-[0.3em] font-condensed text-foreground/40 mb-4">
              MIS PEDIDOS
            </h2>

            {orders.length === 0 ? (
              <div className="border border-black/[0.08] rounded-sm p-12 text-center bg-black/[0.01]">
                <Package className="w-8 h-8 text-foreground/15 mx-auto mb-3" />
                <p className="text-foreground/40 font-sans text-sm">
                  Todavía no realizaste ningún pedido.
                </p>
                <Link
                  href="/destilados"
                  className="inline-block mt-5 px-6 py-2.5 bg-primary text-black text-[11px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-foreground hover:text-white transition-all font-condensed"
                >
                  VER DESTILADOS
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => {
                  const st = STATUS[order.status] ?? STATUS.pending
                  const date = new Date(order.created_at).toLocaleDateString('es-AR', {
                    day: '2-digit', month: 'short', year: 'numeric',
                  })
                  return (
                    <Link
                      key={order.id}
                      href={`/cuenta/pedidos/${order.id}`}
                      className="flex items-center justify-between p-5 border border-black/[0.08] rounded-sm bg-white hover:border-primary/20 hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Package className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold tracking-widest font-condensed text-foreground">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p className="text-[11px] text-foreground/40 font-sans mt-0.5">{date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-bold tracking-widest font-condensed border px-2.5 py-1 rounded-sm ${st.cls}`}>
                          {st.label.toUpperCase()}
                        </span>
                        <span className="text-sm font-sans font-semibold text-foreground">
                          {formatPrice(order.total)}
                        </span>
                        <ChevronRight className="w-4 h-4 text-foreground/20 group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
