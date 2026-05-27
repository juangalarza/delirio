'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const steps = [
  {
    number: '01. SELECCIÓN',
    description: 'Seleccionamos manualmente cada botánico en su punto justo de madurez, priorizando la flora autóctona.',
    image: '/images/generated-1778549076048.png'
  },
  {
    number: '02. MACERACIÓN',
    description: '48 horas de contacto controlado para extraer la esencia más pura y compleja de cada ingrediente.',
    image: '/images/generated-1778549075774.png'
  },
  {
    number: '03. DESTILACIÓN',
    description: 'Lenta y controlada en alambique de cobre, descartando cabezas y colas para asegurar solo el corazón.',
    image: '/images/generated-1778549078456.png'
  }
]

export function Process() {
  return (
    <section id="proceso" className="py-32 px-4 md:px-24">
      <div className="px-8 md:px-24">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-3xl md:text-4xl font-serif text-white mb-16 tracking-widest"
        >
          EL PROCESO
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[600px] rounded-lg overflow-hidden glass p-8 flex flex-col justify-end"
            >
              <Image
                src={step.image}
                alt={step.number}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="relative z-10">
                <span className="text-[24px] tracking-[0.2em] text-primary mb-2 block font-condensed">
                  {step.number}
                </span>
                <p className="text-sm font-sans text-white/80 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
