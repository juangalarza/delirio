'use client'

import Link from 'next/link'
import Image from 'next/image'

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/deliriogin' },
  { label: 'Facebook',  href: 'https://facebook.com/deliriogin' },
  { label: 'WhatsApp',  href: 'https://wa.me/5491100000000' },
]

const LEGAL_LINKS = [
  { label: 'Términos y condiciones', href: '/terminos' },
  { label: 'Privacidad',             href: '/privacidad' },
  { label: 'Envíos',                 href: '/envios' },
  { label: 'Devoluciones',           href: '/devoluciones' },
]

export function Footer() {
  return (
    <footer id="contacto" className="py-24 px-8 md:px-24 bg-[#222120] flex flex-col items-center gap-10">
      <Image
        src="/images/logo.png"
        alt="Delirio Destilería"
        width={240}
        height={80}
        className="object-contain brightness-0 invert opacity-80"
      />

      <div className="flex gap-10">
        {SOCIAL_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-widest text-white/50 hover:text-primary transition-colors uppercase"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {LEGAL_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-[10px] tracking-widest text-white/25 hover:text-primary transition-colors uppercase"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 text-center mt-4">
        <p className="text-[10px] tracking-widest text-white/30 uppercase">
          Beber con moderación. Prohibida su venta a menores de 18 años.
        </p>
        <p className="text-[10px] tracking-widest text-white/20 uppercase">
          © {new Date().getFullYear()} Delirio Destilería. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
