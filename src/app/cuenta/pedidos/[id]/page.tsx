'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Orbs } from '@/components/Orbs'
import { formatPrice } from '@/lib/utils'

type OrderItem = {
  id: string
  name: string
  price: number
  qty: number
}

type Order = {
  id: string
  status: 'pending' | 'paid' | 'rejected'
  total: number
  subtotal: number
  shipping_cost: number
  created_at: string
  contact: { nombre: string; telefono: string }
  shipping_address: { calle: string; ciudad: string; provincia: string; codigoPostal: string }
  mp_payment_id: string | null
  order_items: OrderItem[]
}

const STATUS: Record<string, { label: string; cls: string }> = {
  pending:  { label: 'Pendiente de pago', cls: 'bg-amber-50 text-amber-600 border-amber-200' },
  paid:     { label: 'Confirmado',         cls: 'bg-primary/10 text-primary border-primary/20' },
  rejected: { label: 'Rechazado',          cls: 'bg-red-50 text-red-500 border-red-200' },
}

export default function OrderDetailPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [order, setOrder]     = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace('/login'); return }

      try {
        const res = await fetch(`/api/cuenta/orders/${id}`, {
          headers: { Authorization: `Bearer ${session.access_token}` },
        })
        if (!res.ok) { setNotFound(true); setLoading(false); return }
        const json = await res.json()
        setOrder(json.order)
      } catch {
        setNotFound(true)
      }
      setLoading(false)
    }
    load()
  }, [id, router])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Orbs /><Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </main>
        <Footer />
      </div>
    )
  }

  if (notFound || !order) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Orbs /><Navbar />
        <main className="flex-1 pt-32 pb-24 px-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-foreground/40 font-sans text-sm mb-4">Pedido no encontrado.</p>
            <Link href="/cuenta" className="text-primary text-sm font-sans hover:underline">
              ← Volver a mi cuenta
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const st   = STATUS[order.status] ?? STATUS.pending
  const date = new Date(order.created_at).toLocaleDateString('es-AR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          <Link
            href="/cuenta"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] font-condensed text-foreground/40 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            MI CUENTA
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-[11px] tracking-[0.3em] text-foreground/40 font-condensed mb-1">PEDIDO</p>
                <h1 className="text-2xl font-serif text-foreground">
                  #{order.id.slice(0, 8).toUpperCase()}
                </h1>
                <p className="text-foreground/40 font-sans text-xs mt-1">{date}</p>
              </div>
              <span className={`text-[10px] font-bold tracking-widest font-condensed border px-3 py-1.5 rounded-sm ${st.cls}`}>
                {st.label.toUpperCase()}
              </span>
            </div>

            {/* Items */}
            <section className="border border-black/5 rounded-sm overflow-hidden mb-4">
              <div className="px-5 py-3 border-b border-black/5 bg-black/[0.015]">
                <p className="text-[10px] tracking-[0.3em] font-condensed text-foreground/40">PRODUCTOS</p>
              </div>
              <div className="divide-y divide-black/5">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="text-sm font-condensed font-bold text-foreground tracking-wide">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-foreground/40 font-sans mt-0.5">
                        {formatPrice(item.price)} × {item.qty}
                      </p>
                    </div>
                    <p className="text-sm font-sans font-semibold text-foreground">
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Totals */}
            <section className="border border-black/5 rounded-sm p-5 mb-4 bg-black/[0.01]">
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm font-sans text-foreground/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-sans text-foreground/60">
                  <span>Envío</span>
                  <span>{formatPrice(order.shipping_cost)}</span>
                </div>
                <div className="flex justify-between text-sm font-sans font-bold text-foreground pt-2.5 border-t border-black/5">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </section>

            {/* Shipping & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <section className="border border-black/5 rounded-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <p className="text-[10px] tracking-[0.3em] font-condensed text-foreground/40">DIRECCIÓN</p>
                </div>
                <p className="text-sm font-sans text-foreground/70 leading-relaxed">
                  {order.shipping_address.calle}<br />
                  {order.shipping_address.ciudad}, {order.shipping_address.provincia}<br />
                  CP {order.shipping_address.codigoPostal}
                </p>
              </section>
              <section className="border border-black/5 rounded-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <p className="text-[10px] tracking-[0.3em] font-condensed text-foreground/40">CONTACTO</p>
                </div>
                <p className="text-sm font-sans text-foreground/70 leading-relaxed">
                  {order.contact.nombre}<br />
                  {order.contact.telefono}
                </p>
              </section>
            </div>

          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
