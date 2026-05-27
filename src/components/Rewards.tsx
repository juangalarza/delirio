'use client'

import { motion } from 'framer-motion'

const rewards = [
  '98 PTS - IWSC',
  'GOLD MEDAL 2024',
  'BEST IN CLASS',
  'SAN JUAN ORIGIN'
]

export function Rewards() {
  return (
    <section className="h-[150px] bg-[#222120] border-y border-white/5 flex items-center justify-center">
      <div className="flex flex-wrap justify-center gap-12 md:gap-20">
        {rewards.map((reward, i) => (
          <motion.span 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="text-lg font-serif text-white/30 tracking-widest"
          >
            {reward}
          </motion.span>
        ))}
      </div>
    </section>
  )
}
