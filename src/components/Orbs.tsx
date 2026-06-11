'use client'

import { motion } from 'framer-motion'

export function Orbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Orb 1 - Gold/Yellow — opacidad reducida para fondo blanco */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, #c5a059 0%, transparent 70%)',
          top: '10%',
          right: '-10%'
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Orb 2 - Botanico/Green */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full blur-[150px] opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, #4a5d4e 0%, transparent 70%)',
          top: '40%',
          left: '-20%'
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Orb 3 - Citrico/Orange */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #d48c5b 0%, transparent 70%)',
          top: '70%',
          right: '-5%'
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}
