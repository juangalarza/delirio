'use client'

import { motion } from 'framer-motion'

export function Manifesto() {
  return (
    <section id="filosofia" className="py-16 px-6 md:py-24 md:px-16 lg:py-32 lg:px-24 flex flex-col items-center justify-center text-center bg-[#FAFAF8] border-t border-b border-black/[0.05]">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-[13px] md:text-[16px] tracking-[0.4em] text-primary mb-8 md:mb-12"
      >
        NUESTRA FILOSOFÍA
      </motion.span>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground/90 italic leading-relaxed max-w-4xl mx-auto"
      >
        "En Delirio creemos que los grandes momentos merecen ser acompañados por productos excepcionales. Nos impulsa la pasión por el buen gusto, la innovación y la excelenecia, creando destilados con personalidad propia que inspiran encuentros, celebraciones y experiencias inolvidables."
      </motion.p>
    </section>
  )
}
