'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'

export function Collection() {
  return (
    <section id="colección" className="min-h-[calc(100vh-80px)] pt-24 pb-12 px-4 md:px-24">
      <div className="px-8 md:px-24">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-3xl md:text-4xl font-serif text-foreground mb-6 tracking-widest"
        >
          LOS DESTILADOS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[600px] rounded-lg overflow-hidden glass p-8 flex flex-col justify-end"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-serif text-white">{product.name}</h3>
                  <span className="text-[9px] tracking-widest text-primary border border-primary/40 px-2 py-0.5 rounded-sm font-condensed font-bold shrink-0">
                    {product.abv} VOL
                  </span>
                </div>
                <p className="text-sm font-sans text-white/60 mb-6 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="text-[24px] text-primary font-condensed">{formatPrice(product.price)}</span>
                  <button className="text-[16px] tracking-widest text-white hover:text-primary transition-colors">
                    VER PRODUCTO
                  </button>
                </div>
              </div>
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
            className="px-12 py-4 border border-black/10 text-foreground/50 text-[16px] tracking-[0.3em] font-condensed hover:border-primary hover:text-primary transition-all rounded-sm"
          >
            VER TODOS
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
