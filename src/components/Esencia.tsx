'use client'

import { motion } from 'framer-motion'

export function Esencia() {
  return (
    <section className="py-32 px-8 md:px-24 flex flex-col items-center justify-center text-center">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-[16px] tracking-[0.4em] text-primary mb-12"
      >
        ESENCIA
      </motion.span>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-serif text-foreground/90 italic leading-relaxed max-w-4xl mx-auto"
      >
        Delirio es una destilería que desafía lo convencional, creando destilados con calidad reconocida mundialmente e identidad propia que brindan experiencias únicas.
      </motion.p>
    </section>
  )
}
