'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Orbs } from "@/components/Orbs"
import { products } from "@/lib/constants"

export default function DestiladosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0C0C0C]">
      <Orbs />
      <Navbar />
      
      <main className="pt-40 pb-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">NUESTRA COLECCIÓN</h1>
            <p className="text-white/50 max-w-2xl font-sans">
              Explora la gama completa de Delirio. Cada botella es el resultado de una búsqueda incansable por la perfección y el respeto por los botánicos del desierto.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product, i) => (
              <motion.div 
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[600px] rounded-lg overflow-hidden glass p-8 flex flex-col justify-end border border-white/5 hover:border-primary/20 transition-all"
              >
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-serif text-white mb-2">{product.name}</h3>
                  <p className="text-sm font-sans text-white/60 mb-8 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-8">
                    <span className="text-2xl text-primary font-condensed font-bold">{product.price}</span>
                    <button className="px-6 py-3 bg-primary text-black text-[10px] tracking-widest font-bold rounded-sm hover:bg-white transition-colors">
                      COMPRAR AHORA
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
