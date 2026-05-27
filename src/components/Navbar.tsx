'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 px-8 md:px-24 bg-background/50 backdrop-blur-md">
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
        {['HERENCIA', 'DESTILADOS', 'PROCESO', 'CONTACTO'].map((item) => (
          <Link
            key={item}
            href={`/#${item.toLowerCase() === 'destilados' ? 'colección' : item.toLowerCase()}`}
            className="text-[16px] tracking-[0.2em] text-white hover:text-primary transition-colors font-condensed"
          >
            {item}
          </Link>
        ))}

        <button className="flex items-center gap-2 px-5 py-2 border border-primary text-primary rounded-sm hover:bg-primary hover:text-primary-foreground transition-all font-condensed">
          <ShoppingBag className="w-4 h-4" />
          <span className="text-[16px] tracking-widest font-bold">CARRITO</span>
        </button>
      </div>
    </nav>
  )
}
