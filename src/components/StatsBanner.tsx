'use client'

import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

function Counter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: 2
  })

  const displayValue = useTransform(spring, (current) => Math.round(current))

  useEffect(() => {
    if (inView) {
      spring.set(value)
    }
  }, [inView, value, spring])

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  )
}

type Stat =
  | { label: string; value: number; suffix: string }
  | { label: string; static: string }

const stats: Stat[] = [
  { label: 'Est.',                     static: '2020' },
  { label: 'Destilados',              value: 7,   suffix: '' },
  { label: 'Artesanal',               value: 100, suffix: '%' },
  { label: 'Premios internacionales',  value: 15,  suffix: '' },
]

export function StatsBanner() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-8 lg:px-24 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-7xl rounded-2xl bg-[#F5F2EC] border border-black/10 border-t-[3px] border-t-primary py-10 md:py-0 md:h-[190px] grid grid-cols-2 md:grid-cols-4 items-center justify-items-center px-6 md:px-16 gap-8 md:gap-0 shadow-[0_12px_48px_rgba(0,0,0,0.09)]"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            viewport={{ once: true }}
            className={`flex flex-col items-center text-center w-full py-2 ${
              i > 0 ? 'md:border-l md:border-black/[0.10]' : ''
            }`}
          >
            <span className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground font-bold tabular-nums">
              {'static' in stat
                ? stat.static
                : <Counter value={stat.value} suffix={stat.suffix} />
              }
            </span>
            <span className="text-[11px] md:text-[13px] tracking-[0.35em] text-primary font-condensed mt-2 uppercase leading-tight">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
