'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function B2B() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <Image 
        src="/images/generated-1778549080715.png" 
        alt="B2B Delirio" 
        fill
        className="object-cover"
      />
      
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[12px] tracking-[0.5em] text-primary mb-6"
        >
          ¿TIENES UN NEGOCIO?
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-serif text-white mb-8"
        >
          CONVIÉRTETE EN REVENDEDOR
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-[700px] text-lg text-white/70 mb-10"
        >
          Únete a la red de embajadores de Delirio y lleva la vanguardia a tu establecimiento.
        </motion.p>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="px-10 py-5 border border-primary text-primary font-bold tracking-widest rounded-sm hover:bg-primary hover:text-black transition-all"
        >
          SOLICITAR INFORMACIÓN
        </motion.button>
      </div>
    </section>
  )
}
