'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'

export function Navbar() {
  const { openCart, totalCount } = useCartStore()
  const count = totalCount()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 px-8 md:px-24 transition-all duration-500 ease-in-out ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md border-b border-black/[0.07] shadow-[0_1px_10px_rgba(0,0,0,0.06)]'
        : 'bg-transparent'
    }`}>
      <Link href="/" className="flex items-center mt-2">
        <div className="relative h-[60px] w-[180px] overflow-hidden">
          {/* Logo blanco/crema — navbar transparente sobre hero */}
          <img
            src="/images/logo-nav-white.png"
            alt="Delirio Destilería"
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60px] w-auto max-w-none transition-opacity duration-500 ${
              scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />
          {/* Logo negro — navbar blanco al scrollear */}
          <img
            src="/images/logo-nav.png"
            alt="Delirio Destilería"
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-auto max-w-none transition-opacity duration-500 ${
              scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-10">
        {['HERENCIA', 'DESTILADOS', 'CONTACTO'].map((item) => (
          <Link
            key={item}
            href={`/#${item.toLowerCase() === 'destilados' ? 'colección' : item.toLowerCase()}`}
            className={`text-[16px] tracking-[0.2em] transition-colors duration-300 font-condensed ${
              scrolled
                ? 'text-foreground hover:text-primary'
                : 'text-white/90 hover:text-white'
            }`}
          >
            {item}
          </Link>
        ))}

        <button
          onClick={openCart}
          className={`relative flex items-center gap-2 px-5 py-2 border rounded-sm transition-all duration-300 font-condensed cursor-pointer ${
            scrolled
              ? 'border-primary text-primary hover:bg-primary hover:text-black'
              : 'border-white/70 text-white hover:bg-white hover:text-black'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-[16px] tracking-widest font-bold">CARRITO</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-black text-[10px] font-bold rounded-full flex items-center justify-center font-condensed">
              {count > 9 ? '9+' : count}
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}
