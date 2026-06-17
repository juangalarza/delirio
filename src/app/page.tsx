import type { Metadata } from 'next'
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBanner } from "@/components/StatsBanner";
import { Manifesto } from "@/components/Manifesto";
import { Collection } from "@/components/Collection";
import { B2B } from "@/components/B2B";
import { Rewards } from "@/components/Rewards";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Orbs } from "@/components/Orbs";

export const metadata: Metadata = {
  title: 'Delirio Destilería | Gin Premium Argentino',
  description: 'Delirio es una destilería que desafía lo convencional, creando destilados con calidad reconocida mundialmente e identidad propia que brindan experiencias únicas.',
  openGraph: {
    title: 'Delirio Destilería | Gin Premium Argentino',
    description: 'Destilados artesanales con carácter propio. Descubrí la experiencia Delirio.',
    type: 'website',
    locale: 'es_AR',
    images: [
      {
        url: '/images/hero-delirio.jpg',
        width: 1200,
        height: 630,
        alt: 'Delirio Destilería — Gin Premium Argentino',
      },
    ],
  },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar />

      <main>
        <Hero />
        <StatsBanner />
<Manifesto />
        <Collection />
        <B2B />
        <Rewards />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
