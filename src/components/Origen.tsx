'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Origen() {
  return (
    <section id="origen" className="py-20 md:py-28 lg:py-36 px-6 md:px-16 lg:px-24 bg-[#0A0A0A] text-white overflow-hidden border-t border-white/[0.05] relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        {/* Left Side: Premium Image Showcase */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-5 relative group"
        >
          <div className="relative h-[350px] sm:h-[450px] lg:h-[550px] w-full rounded-lg overflow-hidden border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <Image
              src="/images/origen-1.jpg"
              alt="Paisaje de San Juan y procedencia de los botánicos de Delirio"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Overlay gradient for elegance */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 border border-primary/20 m-3 pointer-events-none rounded-[6px] transition-all duration-500 group-hover:border-primary/40" />
          </div>
          {/* Decorative tag */}
          <div className="absolute -bottom-4 -right-4 bg-primary text-black font-condensed tracking-widest text-[11px] font-bold px-4 py-2 rounded-sm shadow-lg uppercase">
            San Juan, Argentina
          </div>
        </motion.div>

        {/* Right Side: Text Story */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          <span className="text-[12px] md:text-[14px] tracking-[0.5em] text-primary font-condensed mb-4 uppercase">
            NUESTRO ORIGEN
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight uppercase tracking-wider">
            Una obsesión por lo extraordinario
          </h2>

          <div className="space-y-6 md:space-y-8 text-white/80 font-sans text-[15px] md:text-[17px] leading-relaxed max-w-2xl">
            <p>
              En <strong className="text-white font-medium">San Juan</strong>, durante uno de los momentos más desafiantes de la historia reciente, nació Delirio. Lo que comenzó como la pasión de una persona por perfeccionar cada detalle de la destilación se convirtió en una búsqueda constante de excelencia, innovación y carácter.
            </p>
            <p>
              Con una visión clara y el deseo de desafiar lo convencional, transformamos esa pasión en una destilería artesanal dedicada a crear productos únicos, capaces de sorprender en cada copa.
            </p>
            <p className="text-white text-base md:text-lg border-l-2 border-primary pl-4 md:pl-6 italic font-serif">
              Porque Delirio no nació de una oportunidad de negocio. Nació de una obsesión por hacer las cosas extraordinariamente bien.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
