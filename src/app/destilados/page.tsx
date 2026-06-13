'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Orbs } from "@/components/Orbs"
import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/constants'
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/store/cart"

export default function DestiladosPage() {
  const { addItem, openCart } = useCartStore()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setProducts(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar />

      <main className="pt-40 pb-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-foreground mb-6">NUESTRA COLECCIÓN</h1>
            <p className="text-foreground/50 max-w-2xl font-sans">
              Explora la gama completa de Delirio. Cada botella es el resultado de una búsqueda incansable por la perfección y el respeto por los botánicos del desierto.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-[600px] rounded-lg bg-foreground/5 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center gap-4">
              <p className="text-foreground/40 font-sans">No hay productos disponibles aún.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/destilados/${product.slug}`}
                    className="group relative h-[600px] rounded-lg overflow-hidden glass p-8 flex flex-col justify-end border border-white/5 hover:border-primary/20 transition-all block"
                  >
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-serif text-white">{product.name}</h3>
                        {product.abv && (
                          <span className="text-[10px] tracking-widest text-primary border border-primary/40 px-2 py-0.5 rounded-sm font-condensed font-bold shrink-0">
                            {product.abv} VOL
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-sans text-white/60 mb-8 leading-relaxed">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between border-t border-white/10 pt-8 gap-3">
                        <span className="text-2xl text-primary font-condensed font-bold shrink-0">{formatPrice(product.price)}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            addItem({
                              id: product.id,
                              slug: product.slug,
                              name: product.name,
                              price: product.price,
                              image: product.image_url,
                              abv: product.abv || '',
                            })
                            openCart()
                          }}
                          className="px-5 py-3 bg-primary text-black text-[10px] tracking-widest font-bold rounded-sm hover:bg-white transition-colors font-condensed"
                        >
                          AGREGAR AL CARRITO
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
