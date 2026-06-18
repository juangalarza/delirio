import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
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

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <span className="hero-anim-1 text-[12px] tracking-[0.5em] text-primary mb-6 font-condensed uppercase">
          Destilería artesanal de vanguardia
        </span>

        <h1 className="hero-anim-2 text-5xl sm:text-6xl md:text-8xl lg:text-[120px] font-serif text-white font-bold uppercase max-w-[1200px] leading-tight mb-6">
          Esencia
        </h1>

        <p className="hero-anim-3 text-base md:text-lg lg:text-xl text-white/90 max-w-[90vw] md:max-w-[700px] leading-relaxed mb-8 md:mb-10 italic font-serif px-2 md:px-0">
          Delirio es una destilería que desafía lo convencional, creando destilados con calidad reconocida mundialmente e identidad propia que brindan experiencias únicas.
        </p>

        <button className="hero-anim-4 px-8 md:px-10 py-4 md:py-5 bg-primary text-black font-bold tracking-widest rounded-sm hover:scale-105 transition-all uppercase text-sm md:text-base">
          Explorar
        </button>
      </div>
    </section>
  )
}
