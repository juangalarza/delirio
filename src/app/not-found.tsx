import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Orbs } from '@/components/Orbs'

export const metadata: Metadata = {
  title: 'Página no encontrada — Delirio Destilería',
  description: 'La página que buscás no existe o fue removida.',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar staticLogo />

      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="text-center max-w-sm">
          <Image
            src="/images/logo.png"
            alt="Delirio Gin"
            width={90}
            height={90}
            className="mx-auto mb-8 object-contain opacity-30"
          />

          <p className="text-[10px] tracking-[0.4em] text-primary font-condensed mb-3">
            ERROR 404
          </p>
          <h1 className="text-4xl font-serif font-bold text-foreground uppercase tracking-widest leading-tight mb-4">
            Página<br />no encontrada
          </h1>
          <p className="text-foreground/40 font-sans text-sm leading-relaxed mb-10">
            La página que buscás no existe o fue removida.<br />
            Revisá la URL o volvé al inicio.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-8 py-3.5 bg-primary text-black font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-foreground hover:text-white transition-all duration-300"
            >
              IR AL INICIO
            </Link>
            <Link
              href="/destilados"
              className="px-8 py-3.5 border border-black/10 text-foreground font-condensed text-[11px] tracking-[0.2em] uppercase rounded-sm hover:border-primary hover:text-primary transition-all duration-300"
            >
              VER DESTILADOS
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
