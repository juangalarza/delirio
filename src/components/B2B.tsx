'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function B2B() {
  return (
    <section className="relative min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/revendedor.webp"
        alt="Bar con botellas de Delirio Gin — oportunidad B2B para distribuidores y bares"
        fill
        className="object-cover"
        sizes="100vw"
        quality={70}
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 py-16 md:py-0">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[11px] md:text-[12px] tracking-[0.5em] text-primary mb-4 md:mb-6 uppercase"
        >
          ¿Tenés un negocio?
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-6xl font-serif text-white mb-6 md:mb-8 uppercase"
        >
          Convertite en revendedor
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-[90vw] md:max-w-[700px] text-base md:text-lg text-white/70 mb-8 md:mb-10"
        >
          Únete a la red de embajadores de Delirio y lleva la vanguardia a tu establecimiento.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="px-8 md:px-10 py-4 md:py-5 border border-primary text-primary font-bold tracking-widest rounded-sm hover:bg-primary hover:text-black transition-all uppercase text-sm md:text-base cursor-pointer"
        >
          Solicitar información
        </motion.button>
      </div>
    </section>
  )
}
