'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'

const NAV_LINKS = [
  { label: 'Origen',  href: '/#origen' },
  { label: 'Productos', href: '/#colección' },
  { label: 'Contacto',  href: '/#contacto' },
]

export function Navbar({ staticLogo = false }: { staticLogo?: boolean }) {
  const { openCart, totalCount } = useCartStore()
  const [scrolled, setScrolled]   = useState(false)
  const [mounted, setMounted]     = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (staticLogo) return
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [staticLogo])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isLight = staticLogo || scrolled
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 px-6 md:px-24 transition-all duration-500 ease-in-out ${
        isLight
          ? 'bg-white/95 backdrop-blur-md border-b border-black/[0.07] shadow-[0_1px_10px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}>
        {/* Logo */}
        <Link href="/" className="flex items-center mt-2" onClick={closeMenu}>
          <div className="relative h-[60px] w-[160px] md:w-[180px] overflow-hidden">
            {!staticLogo && (
              <Image
                src="/images/logo-nav-white.png"
                alt="Delirio Destilería"
                width={180}
                height={60}
                sizes="180px"
                priority
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60px] w-auto max-w-none transition-opacity duration-500 ${
                  scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              />
            )}
            <Image
              src="/images/logo-nav.png"
              alt="Delirio Destilería"
              width={180}
              height={60}
              sizes="180px"
              priority
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] md:w-[180px] h-auto max-w-none transition-opacity duration-500 ${
                staticLogo ? 'opacity-100' : scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`text-[16px] tracking-[0.2em] transition-colors duration-300 font-condensed uppercase ${
                isLight
                  ? 'text-foreground hover:text-primary'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}

          <button
            onClick={openCart}
            className={`relative flex items-center gap-2 px-5 py-2 border rounded-sm transition-all duration-300 font-condensed cursor-pointer ${
              isLight
                ? 'border-primary text-primary hover:bg-primary hover:text-black'
                : 'border-white/70 text-white hover:bg-white hover:text-black'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-[16px] tracking-widest font-bold uppercase">Carrito</span>
            {mounted && totalCount() > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-black text-[10px] font-bold rounded-full flex items-center justify-center font-condensed">
                {totalCount() > 9 ? '9+' : totalCount()}
              </span>
            )}
          </button>
        </div>

        {/* Mobile: cart badge + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={openCart}
            aria-label="Abrir carrito"
            className={`relative w-10 h-10 flex items-center justify-center rounded-sm transition-all cursor-pointer ${
              isLight ? 'text-primary' : 'text-white'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            {mounted && totalCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black text-[9px] font-bold rounded-full flex items-center justify-center font-condensed">
                {totalCount() > 9 ? '9+' : totalCount()}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            className={`w-10 h-10 flex items-center justify-center cursor-pointer ${
              isLight ? 'text-foreground' : 'text-white'
            }`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[#0C0C0C] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          {/* Overlay header */}
          <div className="flex items-center justify-between h-20 px-6">
            <Link href="/" onClick={closeMenu}>
              <Image
                src="/images/logo-nav-white.png"
                alt="Delirio Destilería"
                width={140}
                height={47}
                className="object-contain"
              />
            </Link>
            <button
              onClick={closeMenu}
              aria-label="Cerrar menú"
              className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] mx-6" />

          {/* Nav links */}
          <nav className="flex flex-col items-center justify-center flex-1 gap-10 px-6">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={closeMenu}
                className="text-[40px] font-serif text-white/70 hover:text-primary transition-colors duration-300 uppercase tracking-[0.12em] leading-none"
              >
                {label}
              </Link>
            ))}

            <div className="h-px w-16 bg-primary/30 my-2" />

            <button
              onClick={() => { closeMenu(); openCart() }}
              className="flex items-center gap-3 text-[40px] font-serif text-white/70 hover:text-primary transition-colors duration-300 uppercase tracking-[0.12em] leading-none cursor-pointer"
            >
              <ShoppingBag className="w-7 h-7" />
              Carrito
            </button>
          </nav>

          {/* Overlay footer */}
          <div className="px-6 pb-10 text-center">
            <p className="text-[9px] tracking-[0.3em] text-white/20 uppercase font-condensed">
              Beber con moderación. Prohibida la venta a menores de 18 años.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
