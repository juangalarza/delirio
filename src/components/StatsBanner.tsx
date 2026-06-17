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

const stats = [
  { label: 'Botánicos', value: 12, suffix: '+' },
  { label: 'Destilados', value: 7, suffix: '' },
  { label: 'Artesanal', value: 100, suffix: '%' },
  { label: 'Premios internacionales', value: 15, suffix: '' },
]

export function StatsBanner() {
  return (
    <section className="py-20 px-8 md:px-24 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl h-auto md:h-[160px] py-10 md:py-0 rounded-2xl bg-[#F5F2EC] border border-black/10 flex flex-col md:flex-row items-center justify-around px-8 md:px-16 gap-8 md:gap-4"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <span className="text-4xl md:text-6xl font-serif text-foreground font-bold">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-[16px] tracking-widest text-primary font-condensed mt-2 uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
