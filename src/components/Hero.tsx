'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-delirio.jpg"
        alt="Delirio Hero"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[12px] tracking-[0.5em] text-primary mb-6 font-condensed"
        >
          DESTILERÍA ARTESANAL DE VANGUARDIA
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-[120px] font-serif text-white font-bold uppercase max-w-[1200px] leading-tight mb-6"
        >
          NUESTRA<br />ESCENCIA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-white max-w-[700px] leading-relaxed mb-10 font-bold"
        >
          En la Destilería Delirio creamos destilados artesanales que combinan tradición e innovación.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="px-10 py-5 bg-primary text-black font-bold tracking-widest rounded-sm hover:scale-105 transition-all"
        >
          EXPLORAR
        </motion.button>
      </div>

    </section>
  )
}
