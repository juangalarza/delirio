'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Trophy } from 'lucide-react'

type Reward = {
  image: string
  title: string
  category: string
  year: string
  alt: string
}

const row1: Reward[] = [
  { image: '/images/premios/00.png', title: 'IWSC Double Gold',      category: '98 puntos — Best in Class',   year: '2025', alt: 'Medalla IWSC Double Gold 2025 — 98 puntos, Best in Class' },
  { image: '/images/premios/01.png', title: 'Global Gin Masters',    category: 'Master Medal Winner',         year: '2026', alt: 'Medalla Global Gin Masters 2026 — Master Medal Winner' },
  { image: '/images/premios/02.png', title: 'San Francisco Spirits', category: 'Double Gold Medalist',        year: '2025', alt: 'Medalla San Francisco World Spirits Competition 2025 — Double Gold' },
  { image: '/images/premios/03.png', title: 'London Spirits',        category: 'Gold Medal — 96 puntos',     year: '2026', alt: 'Medalla London Spirits Competition 2026 — Gold Medal, 96 puntos' },
  { image: '/images/premios/04.png', title: 'Berlin International',  category: 'Best Craft Gin Argentina',   year: '2025', alt: 'Medalla Berlin International Spirits 2025 — Best Craft Gin Argentina' },
  { image: '/images/premios/05.png', title: 'Microliquor Awards',    category: 'Triple Gold Medal',          year: '2025', alt: 'Medalla Microliquor Awards 2025 — Triple Gold Medal' },
  { image: '/images/premios/06.png', title: 'Bartender Spirits',     category: '95 puntos — Double Gold',    year: '2026', alt: 'Medalla Bartender Spirits Awards 2026 — 95 puntos, Double Gold' },
  { image: '/images/premios/07.png', title: 'SIP Awards USA',        category: 'Platinum Medal Winner',      year: '2025', alt: 'Medalla SIP Awards USA 2025 — Platinum Medal Winner' },
]

const row2: Reward[] = [
  { image: '/images/premios/09.png', title: "Int'l Spirits Challenge", category: 'Gold Medal Winner',        year: '2026', alt: 'Medalla International Spirits Challenge 2026 — Gold Medal Winner' },
  { image: '/images/premios/10.png', title: 'Ascot Awards USA',        category: 'Double Gold Medal',        year: '2025', alt: 'Medalla Ascot Awards USA 2025 — Double Gold Medal' },
  { image: '/images/premios/11.png', title: 'USA Spirits Ratings',     category: 'Gold Medal — 94 puntos',  year: '2026', alt: 'Medalla USA Spirits Ratings 2026 — Gold Medal, 94 puntos' },
  { image: '/images/premios/12.png', title: 'Craft Distillers',        category: 'Best in Category Gold',   year: '2025', alt: 'Medalla Craft Distillers Award 2025 — Best in Category Gold' },
  { image: '/images/premios/13.png', title: 'Argentina W&S Awards',    category: 'Best National Craft Gin', year: '2026', alt: 'Medalla Argentina Wine & Spirits Awards 2026 — Best National Craft Gin' },
  { image: '/images/premios/14.png', title: 'World Gin Ratings',       category: 'Super Premium Rating',    year: '2025', alt: 'Medalla World Gin Ratings 2025 — Super Premium Rating' },
  { image: '/images/premios/15.png', title: 'San Juan Distillers',     category: 'Local Product Excellence',year: '2026', alt: 'Medalla San Juan Distillers Award 2026 — Local Product Excellence' },
  { image: '/images/premios/00.png', title: 'Cathay Pacific IWSC',     category: 'Gold Medal — 95 puntos',  year: '2025', alt: 'Medalla Cathay Pacific IWSC 2025 — Gold Medal, 95 puntos' },
]

const allRewards = [...row1, ...row2]

function RewardCard({ reward, isDuplicate }: { reward: Reward; isDuplicate: boolean }) {
  return (
    <div
      aria-hidden={isDuplicate ? true : undefined}
      className="group relative bg-white border border-black/[0.08] hover:border-primary/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center w-[180px] h-[190px] shrink-0 transition-all duration-300 shadow-sm overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.04)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="w-16 h-16 relative flex items-center justify-center shrink-0">
        <Image
          src={reward.image}
          alt={isDuplicate ? '' : reward.alt}
          width={65}
          height={65}
          loading="lazy"
          className="object-contain group-hover:scale-105 transition-all duration-500 drop-shadow-[0_5px_10px_rgba(0,0,0,0.15)]"
        />
      </div>
      <h3 className="text-[10px] font-serif font-bold text-foreground group-hover:text-primary tracking-wide transition-colors duration-300 mt-3 truncate max-w-full uppercase">
        {reward.title}
      </h3>
      <p className="text-[8px] font-sans text-foreground/40 mt-0.5 truncate max-w-full font-medium leading-snug">
        {reward.category}
      </p>
      <span className="text-[7px] font-mono text-primary/40 group-hover:text-primary/70 mt-2 font-bold tracking-widest uppercase transition-colors duration-300">
        {reward.year} Competition
      </span>
    </div>
  )
}

export function Rewards() {
  return (
    <section className="py-16 md:py-24 bg-[#F7F5F0] relative overflow-hidden border-y border-black/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="w-full flex flex-col items-center">

        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 md:mb-12 space-y-4 px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/20 rounded-full"
          >
            <Trophy className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] tracking-[0.25em] font-condensed font-bold text-primary uppercase">
              Distinciones y premios
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-serif font-bold text-foreground tracking-wide leading-tight"
          >
            Reconocimiento Internacional
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm text-foreground/50 leading-relaxed font-sans max-w-2xl"
          >
            En cada gota de Delirio se fusionan los botánicos más puros de nuestra precordillera sanjuanina y el rigor técnico de la destilación galardonada en los certámenes más prestigiosos del planeta.
          </motion.p>
        </div>

        {/* Mobile / Tablet — horizontal snap carousel (single row, all medals) */}
        <div className="lg:hidden w-full overflow-x-auto scrollbar-none pb-2">
          <div className="flex gap-4 px-6 snap-x snap-mandatory" style={{ width: 'max-content' }}>
            {allRewards.map((reward, i) => (
              <div key={`mobile-${i}`} className="snap-start">
                <RewardCard reward={reward} isDuplicate={false} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop — auto-scrolling marquee (two rows) */}
        <div className="hidden lg:flex flex-col gap-6 w-full mt-6 overflow-hidden relative py-4">

          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F7F5F0] via-[#F7F5F0]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F7F5F0] via-[#F7F5F0]/80 to-transparent z-20 pointer-events-none" />

          {/* Fila 1 — avanza hacia la izquierda */}
          <div className="w-full overflow-hidden flex relative select-none">
            <motion.div
              className="flex gap-6 shrink-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            >
              {[...row1, ...row1].map((reward, i) => (
                <RewardCard key={`r1-${i}`} reward={reward} isDuplicate={i >= row1.length} />
              ))}
            </motion.div>
          </div>

          {/* Fila 2 — avanza hacia la derecha */}
          <div className="w-full overflow-hidden flex relative select-none">
            <motion.div
              className="flex gap-6 shrink-0"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            >
              {[...row2, ...row2].map((reward, i) => (
                <RewardCard key={`r2-${i}`} reward={reward} isDuplicate={i >= row2.length} />
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  )
}
