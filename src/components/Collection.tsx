'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart'

export function Collection() {
  const { addItem, openCart } = useCartStore()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products?limit=6')
      .then((r) => r.json())
      .then(({ data }) => {
        setProducts(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section id="colección" className="min-h-[calc(100vh-80px)] pt-16 md:pt-24 pb-12 px-4 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-[480px] md:h-[600px] rounded-lg bg-foreground/5 animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="colección" className="min-h-[calc(100vh-80px)] pt-16 md:pt-24 pb-12 px-4 md:px-16 lg:px-24">
      <div className="mb-10 md:mb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="block text-[11px] md:text-[12px] tracking-[0.5em] text-primary font-condensed uppercase mb-3"
        >
          Destilería Artesanal · San Juan
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground tracking-[0.08em] uppercase leading-none"
        >
          Los destilados
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mt-5"
        >
          <div className="w-8 h-[1.5px] bg-primary shrink-0" />
          <p className="text-[11px] md:text-[12px] font-sans text-foreground/50 tracking-[0.22em] uppercase">
            Cada expresión, destilada con obsesión
          </p>
          <div className="w-8 h-[1.5px] bg-primary shrink-0" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href={`/destilados/${product.slug}`}
              className="group relative h-[480px] md:h-[600px] rounded-lg overflow-hidden glass p-6 md:p-8 flex flex-col justify-end block"
            >
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={70}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl md:text-2xl font-serif text-white">{product.name}</h3>
                  {product.abv && (
                    <span className="text-[9px] tracking-widest text-primary border border-primary/40 px-2 py-0.5 rounded-sm font-condensed font-bold shrink-0 uppercase">
                      {product.abv} vol
                    </span>
                  )}
                </div>
                <p className="text-sm font-sans text-white/60 mb-4 md:mb-6 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between border-t border-white/10 pt-4 md:pt-6 gap-3">
                  <span className="text-[20px] md:text-[24px] text-primary font-condensed shrink-0">{formatPrice(product.price)}</span>
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
                    className="text-[11px] tracking-widest text-black bg-primary hover:bg-white hover:text-black px-4 py-2 rounded-sm font-condensed font-bold transition-colors uppercase"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex justify-center mt-8"
      >
        <Link
          href="/destilados"
          className="px-10 md:px-12 py-4 border border-black/20 text-foreground/70 text-[14px] md:text-[16px] tracking-[0.3em] font-condensed hover:border-primary hover:text-primary transition-all rounded-sm uppercase"
        >
          Ver todos
        </Link>
      </motion.div>
    </section>
  )
}
