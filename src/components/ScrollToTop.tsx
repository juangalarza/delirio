'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('filosofia')
      if (section) {
        const rect = section.getBoundingClientRect()
        // Appears as soon as the top of the "Nuestra Filosofía" section reaches/passes near the top of the viewport
        setVisible(rect.top <= 120)
      } else {
        // Fallback if the element is not rendered
        setVisible(window.scrollY > 600)
      }
    }

    // Run once on mount to set initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 p-3.5 bg-black/90 hover:bg-primary hover:text-black border border-primary text-primary rounded-full shadow-[0_4px_20px_rgba(197,160,89,0.35)] transition-all duration-300 cursor-pointer flex items-center justify-center group active:scale-95"
          aria-label="Volver al inicio"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
