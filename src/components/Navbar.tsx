'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'

export function Navbar() {
  const { openCart, totalCount } = useCartStore()
  const count = totalCount()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 px-8 md:px-24 bg-background/85 backdrop-blur-md border-b border-black/[0.07] shadow-[0_1px_10px_rgba(0,0,0,0.06)]">
      <Link href="/" className="flex items-center mt-2">
        <Image
          src="/images/logo-nav.png"
          alt="Delirio Logo"
          width={180}
          height={60}
          className="object-contain"
        />
      </Link>

      <div className="hidden md:flex items-center gap-10">
        {['HERENCIA', 'DESTILADOS', 'CONTACTO'].map((item) => (
          <Link
            key={item}
            href={`/#${item.toLowerCase() === 'destilados' ? 'colección' : item.toLowerCase()}`}
            className="text-[16px] tracking-[0.2em] text-foreground hover:text-primary transition-colors font-condensed"
          >
            {item}
          </Link>
        ))}

        <button
          onClick={openCart}
          className="relative flex items-center gap-2 px-5 py-2 border border-primary text-primary rounded-sm hover:bg-primary hover:text-black transition-all font-condensed cursor-pointer"
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
