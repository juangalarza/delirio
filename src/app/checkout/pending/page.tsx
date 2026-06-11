'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Orbs } from '@/components/Orbs'

function PendingContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('external_reference')

  return (
    <main className="flex-1 pt-32 pb-24 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg text-center"
      >
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-amber-400" />
        </div>

        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
          Pago pendiente de confirmación
        </h1>

        {orderId && (
          <p className="text-foreground/50 font-sans text-sm mb-1">
            Pedido <span className="font-bold text-foreground">#{orderId}</span>
          </p>
        )}

        <p className="text-foreground/50 font-sans text-sm mb-8 leading-relaxed">
          Tu pago está siendo procesado. Si elegiste transferencia bancaria o pago en efectivo, puede
          demorar algunas horas. Te notificaremos por email cuando se confirme y comenzaremos a
          preparar tu pedido.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-primary text-black font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-foreground hover:text-white transition-all font-condensed"
          >
            VOLVER AL INICIO
          </Link>
          <Link
            href="/destilados"
            className="px-8 py-3 border border-black/10 text-foreground/50 font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:border-foreground hover:text-foreground transition-all font-condensed"
          >
            VER DESTILADOS
          </Link>
        </div>
      </motion.div>
    </main>
  )
}

export default function PendingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar />
      <Suspense fallback={<div className="flex-1" />}>
        <PendingContent />
      </Suspense>
      <Footer />
    </div>
  )
}
