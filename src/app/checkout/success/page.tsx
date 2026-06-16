'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Package } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Orbs } from '@/components/Orbs'
import { useCartStore } from '@/store/cart'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('external_reference')
  const clearCart = useCartStore((s) => s.clearCart)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <main className="flex-1 pt-32 pb-24 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg text-center"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
          ¡Gracias por tu compra!
        </h1>

        {orderId && (
          <p className="text-foreground/50 font-sans text-sm mb-1">
            Pedido <span className="font-bold text-foreground">#{orderId}</span>
          </p>
        )}

        <p className="text-foreground/50 font-sans text-sm mb-8 leading-relaxed">
          Recibirás un email de confirmación con los detalles. En breve nos ponemos en contacto para
          coordinar el envío.
        </p>

        <div className="border border-black/[0.08] rounded-sm p-4 flex items-center gap-3 text-left mb-8 bg-black/[0.01]">
          <Package className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-xs font-condensed font-bold text-foreground">
              Tu pedido está siendo procesado
            </p>
            <p className="text-[11px] text-foreground/40 font-sans">
              Preparamos y despachamos en 1-2 días hábiles
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/destilados"
            className="px-8 py-3 bg-primary text-black font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-foreground hover:text-white transition-all font-condensed"
          >
            SEGUIR EXPLORANDO
          </Link>
          <Link
            href="/"
            className="px-8 py-3 border border-black/10 text-foreground/50 font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:border-foreground hover:text-foreground transition-all font-condensed"
          >
            VOLVER AL INICIO
          </Link>
        </div>
      </motion.div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar staticLogo />
      <Suspense fallback={<div className="flex-1" />}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </div>
  )
}
