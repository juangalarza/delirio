'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function AgeGate() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const verified = localStorage.getItem('delirio_age_verified')
      if (!verified) setVisible(true)
    } catch {
      // localStorage unavailable
    }
  }, [])

  const confirm = () => {
    try { localStorage.setItem('delirio_age_verified', '1') } catch {}
    setVisible(false)
  }

  const deny = () => {
    window.location.replace('https://www.argentina.gob.ar/salud')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0C0C0C] px-6"
        >
          {/* Subtle gold glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.4, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-xs text-center"
          >
            <Image
              src="/images/logo.png"
              alt="Delirio Gin"
              width={110}
              height={110}
              priority
              className="mx-auto mb-8 object-contain drop-shadow-[0_4px_28px_rgba(197,160,89,0.4)]"
            />

            <p className="text-[10px] tracking-[0.4em] text-primary font-condensed mb-3">
              VERIFICACIÓN DE EDAD
            </p>
            <h1 className="text-[28px] font-serif font-bold text-white uppercase tracking-widest leading-tight">
              ¿Sos mayor<br />de 18 años?
            </h1>

            <div className="w-12 h-px bg-primary/30 mx-auto my-5" />

            <p className="text-white/25 font-sans text-[10px] tracking-[0.15em] leading-relaxed mb-10">
              BEBER CON MODERACIÓN.<br />
              PROHIBIDA LA VENTA A MENORES DE 18 AÑOS.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={confirm}
                className="w-full py-4 bg-primary text-black font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-white transition-all duration-300 cursor-pointer"
              >
                SÍ, SOY MAYOR DE 18
              </button>
              <button
                onClick={deny}
                className="w-full py-3 text-white/30 font-sans text-xs tracking-wide hover:text-white/60 transition-colors cursor-pointer"
              >
                No, soy menor de edad
              </button>
            </div>

            <p className="text-white/15 font-sans text-[9px] mt-8 leading-relaxed">
              Al ingresar confirmás tener 18 años o más y aceptás nuestros{' '}
              <Link
                href="/terminos"
                className="underline hover:text-white/40 transition-colors"
                onClick={confirm}
              >
                Términos y Condiciones
              </Link>
              .
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
