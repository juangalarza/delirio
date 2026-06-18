import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Orbs } from "@/components/Orbs";

const StatsBanner = dynamic(() => import('@/components/StatsBanner').then(m => ({ default: m.StatsBanner })))
const Manifesto   = dynamic(() => import('@/components/Manifesto').then(m => ({ default: m.Manifesto })))
const Collection  = dynamic(() => import('@/components/Collection').then(m => ({ default: m.Collection })))
const B2B         = dynamic(() => import('@/components/B2B').then(m => ({ default: m.B2B })))
const Rewards     = dynamic(() => import('@/components/Rewards').then(m => ({ default: m.Rewards })))
const Contact     = dynamic(() => import('@/components/Contact').then(m => ({ default: m.Contact })))
const Footer      = dynamic(() => import('@/components/Footer').then(m => ({ default: m.Footer })))

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
