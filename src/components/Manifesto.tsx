'use client'

import { motion } from 'framer-motion'

export function Manifesto() {
  return (
    <section id="herencia" className="py-32 px-24 flex flex-col items-center justify-center text-center">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-[16px] tracking-[0.4em] text-primary mb-12"
      >
        NUESTRA FILOSOFÍA
      </motion.span>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-serif text-white/90 italic leading-relaxed max-w-4xl mx-auto"
      >
        "Delirio es un viaje. Es una invitación a la desconexión, donde lo mejor de los botánicos del desierto se encuentran con la vanguardia de la destilación artesanal."
      </motion.p>
    </section>
  )
}
