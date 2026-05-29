'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Trophy } from 'lucide-react'

const row1 = [
  {
    image: '/images/premios/00.png',
    title: 'IWSC DOUBLE GOLD',
    category: '98 Points - Best In Class',
    year: '2025'
  },
  {
    image: '/images/premios/01.png',
    title: 'GLOBAL GIN MASTERS',
    category: 'Master Medal Winner',
    year: '2026'
  },
  {
    image: '/images/premios/02.png',
    title: 'SAN FRANCISCO SPIRITS',
    category: 'Double Gold Medalist',
    year: '2025'
  },
  {
    image: '/images/premios/03.png',
    title: 'LONDON SPIRITS',
    category: 'Gold Medal - 96 Points',
    year: '2026'
  },
  {
    image: '/images/premios/04.png',
    title: 'BERLIN INTERNATIONAL',
    category: 'Best Craft Gin Argentina',
    year: '2025'
  },
  {
    image: '/images/premios/05.png',
    title: 'MICROLIQUOR AWARDS',
    category: 'Triple Gold Medal',
    year: '2025'
  },
  {
    image: '/images/premios/06.png',
    title: 'BARTENDER SPIRITS',
    category: '95 Points - Double Gold',
    year: '2026'
  },
  {
    image: '/images/premios/07.png',
    title: 'SIP AWARDS USA',
    category: 'Platinum Medal Winner',
    year: '2025'
  }
]

const row2 = [
  {
    image: '/images/premios/09.png',
    title: 'INT’L SPIRITS CHALLENGE',
    category: 'Gold Medal Winner',
    year: '2026'
  },
  {
    image: '/images/premios/10.png',
    title: 'ASCOT AWARDS USA',
    category: 'Double Gold Medal',
    year: '2025'
  },
  {
    image: '/images/premios/11.png',
    title: 'USA SPIRITS RATINGS',
    category: 'Gold Medal - 94 Points',
    year: '2026'
  },
  {
    image: '/images/premios/12.png',
    title: 'CRAFT DISTILLERS',
    category: 'Best in Category Gold',
    year: '2025'
  },
  {
    image: '/images/premios/13.png',
    title: 'ARGENTINA W&S AWARDS',
    category: 'Best National Craft Gin',
    year: '2026'
  },
  {
    image: '/images/premios/14.png',
    title: 'WORLD GIN RATINGS',
    category: 'Super Premium Rating',
    year: '2025'
  },
  {
    image: '/images/premios/15.png',
    title: 'SAN JUAN DISTILLERS',
    category: 'Local Product Excellence',
    year: '2026'
  },
  {
    image: '/images/premios/00.png',
    title: 'CATHAY PACIFIC IWSC',
    category: 'Gold Medal - 95 Points',
    year: '2025'
  }
]

export function Rewards() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0C0C0C] to-[#060606] relative overflow-hidden border-y border-white/5">
      {/* Subtle top ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Absolute Side Gradient Fades (Fade cards at viewport borders) */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-20 pointer-events-none" />

      <div className="w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 space-y-4 px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/20 rounded-full"
          >
            <Trophy className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] tracking-[0.25em] font-condensed font-bold text-primary uppercase">
              DISTINCIONES Y PREMIOS
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-serif font-bold text-white tracking-wide leading-tight"
          >
            Reconocimiento Internacional
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm text-white/50 leading-relaxed font-sans max-w-2xl"
          >
            En cada gota de Delirio se fusionan los botánicos más puros de nuestra precordillera sanjuanina y el rigor técnico de la destilación galardonada en los certámenes más prestigiosos del planeta.
          </motion.p>
        </div>

        {/* Dual Marquee Container */}
        <div className="w-full flex flex-col gap-6 mt-6 overflow-hidden relative py-4">
          
          {/* Row 1 (Moving Left) */}
          <div className="w-full overflow-hidden flex relative select-none">
            <motion.div
              className="flex gap-6 shrink-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity
              }}
            >
              {[...row1, ...row1].map((reward, i) => (
                <div
                  key={`r1-${i}`}
                  className="group relative bg-[#0F0F0E]/40 border border-white/5 hover:border-primary/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center w-[180px] h-[190px] shrink-0 hover:bg-[#141413]/70 transition-all duration-300 shadow-md overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.04)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="w-16 h-16 relative flex items-center justify-center shrink-0">
                    <Image
                      src={reward.image}
                      alt={reward.title}
                      width={65}
                      height={65}
                      className="object-contain group-hover:scale-105 transition-all duration-500 drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                  <h3 className="text-[10px] font-serif font-bold text-white group-hover:text-primary tracking-wide transition-colors duration-300 mt-3 truncate max-w-full">
                    {reward.title}
                  </h3>
                  <p className="text-[8px] font-sans text-white/40 mt-0.5 truncate max-w-full font-medium leading-snug">
                    {reward.category}
                  </p>
                  <span className="text-[7px] font-mono text-primary/30 group-hover:text-primary/60 mt-2 font-bold tracking-widest uppercase transition-colors duration-300">
                    {reward.year} COMPETITION
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 (Moving Right) */}
          <div className="w-full overflow-hidden flex relative select-none">
            <motion.div
              className="flex gap-6 shrink-0"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity
              }}
            >
              {[...row2, ...row2].map((reward, i) => (
                <div
                  key={`r2-${i}`}
                  className="group relative bg-[#0F0F0E]/40 border border-white/5 hover:border-primary/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center w-[180px] h-[190px] shrink-0 hover:bg-[#141413]/70 transition-all duration-300 shadow-md overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.04)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="w-16 h-16 relative flex items-center justify-center shrink-0">
                    <Image
                      src={reward.image}
                      alt={reward.title}
                      width={65}
                      height={65}
                      className="object-contain group-hover:scale-105 transition-all duration-500 drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                  <h3 className="text-[10px] font-serif font-bold text-white group-hover:text-primary tracking-wide transition-colors duration-300 mt-3 truncate max-w-full">
                    {reward.title}
                  </h3>
                  <p className="text-[8px] font-sans text-white/40 mt-0.5 truncate max-w-full font-medium leading-snug">
                    {reward.category}
                  </p>
                  <span className="text-[7px] font-mono text-primary/30 group-hover:text-primary/60 mt-2 font-bold tracking-widest uppercase transition-colors duration-300">
                    {reward.year} COMPETITION
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  )
}
