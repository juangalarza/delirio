'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Orbs } from '@/components/Orbs'

export default function FailurePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar staticLogo />

      <main className="flex-1 pt-32 pb-24 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg text-center"
        >
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-red-400" />
          </div>

          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
            El pago fue rechazado
          </h1>

          <p className="text-foreground/50 font-sans text-sm mb-8 leading-relaxed">
            Tu pago no pudo procesarse. Esto puede deberse a fondos insuficientes, datos incorrectos o
            restricciones de tu tarjeta. Tu carrito se conservó intacto.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/checkout"
              className="px-8 py-3 bg-primary text-black font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-foreground hover:text-white transition-all font-condensed"
            >
              REINTENTAR PAGO
            </Link>
            <Link
              href="/carrito"
              className="px-8 py-3 border border-black/10 text-foreground/50 font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:border-foreground hover:text-foreground transition-all font-condensed"
            >
              VER CARRITO
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
