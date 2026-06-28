import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative h-screen flex items-end justify-center pb-12 sm:pb-16 md:pb-24 lg:pb-28 overflow-hidden">
      <Image
        src="/images/hero-delirio.jpg"
        alt="Vista de la destilería Delirio entre los cerros de Zonda, San Juan, Argentina"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 100vw"
        quality={85}
      />

      {/* Overlay — bg-black/50 = rgba(0,0,0,0.5), cumple WCAG AA contra texto blanco */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-[90vw] mb-2 md:mb-4">
        <h1 className="hero-anim-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white font-black uppercase tracking-[0.25em] mb-4 leading-tight">
          Esencia
        </h1>

        <p className="hero-anim-3 text-sm md:text-base text-white/80 max-w-[600px] leading-relaxed mb-6 md:mb-8 italic font-serif">
          Delirio es una destilería que desafía lo convencional, creando destilados con calidad reconocida mundialmente e identidad propia.
        </p>

        <button className="hero-anim-4 px-6 md:px-8 py-3.5 md:py-4 bg-primary text-black font-bold tracking-[0.15em] rounded-sm hover:scale-105 transition-all uppercase text-xs md:text-sm cursor-pointer">
          Explorar
        </button>
      </div>
    </section>
  )
}
