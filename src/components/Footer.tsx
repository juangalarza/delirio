'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer id="contacto" className="py-24 px-8 md:px-24 bg-[#222120] flex flex-col items-center gap-10">
      <Image
        src="/images/logo.png"
        alt="Delirio Logo"
        width={240}
        height={80}
        className="object-contain brightness-0 invert opacity-80"
      />

      <div className="flex gap-10">
        {['INSTAGRAM', 'FACEBOOK', 'WHATSAPP'].map((social) => (
          <Link
            key={social}
            href="#"
            className="text-[10px] tracking-widest text-white/50 hover:text-primary transition-colors"
          >
            {social}
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 text-center mt-10">
        <p className="text-[10px] tracking-widest text-white/30">
          BEBER CON MODERACIÓN. PROHIBIDA SU VENTA A MENORES DE 18 AÑOS.
        </p>
        <p className="text-[10px] tracking-widest text-white/20">
          © 2024 DELIRIO DESTILERÍA. TODOS LOS DERECHOS RESERVADOS.
        </p>
      </div>
    </footer>
  )
}
