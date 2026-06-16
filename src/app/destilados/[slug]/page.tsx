'use client'

import { useParams, notFound } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, ArrowLeft, ChevronRight } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Orbs } from '@/components/Orbs'
import type { Product } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const { addItem, openCart } = useCartStore()

  useEffect(() => {
    if (!slug) return
    fetch(`/api/products?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then(({ data }) => {
        setProduct(data || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (!product) return
    fetch(`/api/products?exclude=${product.id}&limit=3&fields=id,slug,name,abv,price,image_url`)
      .then((r) => r.json())
      .then(({ data }) => setRelated(data || []))
  }, [product])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Orbs />
        <Navbar staticLogo />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) notFound()

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image_url,
        abv: product.abv || '',
      })
    }
    openCart()
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar staticLogo />

      <main className="flex-1 pt-32 pb-32">

        {/* Breadcrumb */}
        <div className="px-6 md:px-24 mb-10">
          <nav className="flex items-center gap-2 text-[10px] tracking-widest font-condensed text-foreground/30">
            <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/destilados" className="hover:text-primary transition-colors">DESTILADOS</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground/60">{product.name}</span>
          </nav>
        </div>

        {/* Product Hero */}
        <div className="px-6 md:px-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black/[0.04] lg:sticky lg:top-28"
            >
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-8 pt-4"
            >
              {/* ABV badge + name */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  {product.abv && (
                    <span className="text-[10px] tracking-[0.3em] text-primary font-condensed font-bold border border-primary/40 px-3 py-1 rounded-sm">
                      {product.abv} VOL
                    </span>
                  )}
                  <span className="text-[10px] tracking-[0.3em] text-foreground/30 font-condensed">DESTILADO ARTESANAL</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground tracking-wide leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price */}
              <div>
                <p className="text-4xl font-condensed font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
                <p className="text-[10px] text-foreground/30 font-sans mt-1">Precio por unidad · IVA incluido</p>
              </div>

              {/* Short description */}
              <p className="text-sm font-sans text-foreground/60 leading-relaxed border-l-2 border-primary/30 pl-4">
                {product.description}
              </p>

              {/* Long description */}
              {product.long_description && (
                <p className="text-sm font-sans text-foreground/50 leading-loose">
                  {product.long_description}
                </p>
              )}

              {/* Quantity selector + Add to cart */}
              <div className="space-y-4 pt-2">
                <label className="text-[10px] tracking-[0.2em] font-condensed text-foreground/40 uppercase block">
                  Cantidad
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-black/10 rounded-sm overflow-hidden">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-10 h-11 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-black/[0.03] transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-condensed font-bold text-foreground w-10 text-center select-none">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="w-10 h-11 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-black/[0.03] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-11 bg-primary text-black font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-foreground hover:text-white transition-all duration-300 flex items-center justify-center gap-2 font-condensed"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    AGREGAR AL CARRITO
                  </button>
                </div>

                <p className="text-[9px] text-foreground/25 font-sans">
                  Envío a todo el país · Pago con MercadoPago
                </p>
              </div>

              <div className="border-t border-black/5 pt-6">
                <Link
                  href="/destilados"
                  className="flex items-center gap-2 text-[11px] tracking-widest text-foreground/40 hover:text-primary font-condensed font-bold uppercase transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  VOLVER A DESTILADOS
                </Link>
              </div>
            </motion.div>

          </div>
        </div>

        {/* También te puede interesar */}
        {related.length > 0 && (
          <div className="px-6 md:px-24 mt-28">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <span className="text-[10px] tracking-[0.4em] text-primary font-condensed font-bold mb-3 block">
                  COLECCIÓN DELIRIO
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground tracking-wide">
                  También te puede interesar
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={`/destilados/${p.slug}`}
                      className="group relative h-[400px] rounded-lg overflow-hidden flex flex-col justify-end block"
                    >
                      <Image
                        src={p.image_url}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className="relative z-10 p-6">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-serif text-white">{p.name}</h3>
                          {p.abv && (
                            <span className="text-[8px] tracking-widest text-primary border border-primary/40 px-1.5 py-0.5 rounded-sm font-condensed font-bold shrink-0">
                              {p.abv}
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] font-condensed font-bold text-primary">{formatPrice(p.price)}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}
