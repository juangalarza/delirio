'use client'

import { motion } from 'framer-motion'

export function Manifesto() {
  return (
    <section id="herencia" className="py-32 px-24 flex flex-col items-center justify-center text-center bg-[#FAFAF8] border-t border-b border-black/[0.05]">
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
        className="text-2xl md:text-3xl font-serif text-foreground/90 italic leading-relaxed max-w-4xl mx-auto"
      >
        "En Delirio creemos que cada destilado debe contar una historia. Nos impulsa la pasión por crear experiencias auténticas, combinando tradición artesanal, innovación y carácter para ofrecer productos que inspiren y sorprendan en cada copa."
      </motion.p>
    </section>
  )
}
