'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Orbs } from '@/components/Orbs'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'

export default function CarritoPage() {
  const { items, updateQty, removeItem, clearCart, subtotal } = useCartStore()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar staticLogo />

      <main className="flex-1 pt-36 pb-32 px-6 md:px-24">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <span className="text-[11px] tracking-[0.4em] text-primary font-condensed font-bold mb-3 block">
              MI PEDIDO
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-foreground tracking-wide">
              Tu Carrito
            </h1>
          </motion.div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-6 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center">
                <ShoppingBag className="w-9 h-9 text-primary/30" />
              </div>
              <div>
                <p className="text-lg font-serif text-foreground/50 mb-2">Tu carrito está vacío</p>
                <p className="text-sm text-foreground/30 font-sans">Explorá nuestra colección de destilados artesanales.</p>
              </div>
              <Link
                href="/destilados"
                className="flex items-center gap-2 px-8 py-3.5 bg-primary text-black font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-foreground hover:text-white transition-all font-condensed"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                VER DESTILADOS
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

              {/* Items */}
              <div className="lg:col-span-2 space-y-2">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[11px] tracking-[0.2em] text-foreground/40 font-condensed uppercase">
                    {items.reduce((s, i) => s + i.qty, 0)} producto{items.reduce((s, i) => s + i.qty, 0) !== 1 ? 's' : ''}
                  </p>
                  <button
                    onClick={clearCart}
                    className="text-[10px] tracking-widest text-foreground/30 hover:text-red-400 font-condensed font-bold uppercase transition-colors"
                  >
                    Vaciar carrito
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 60 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-5 p-5 bg-white border border-black/[0.08] rounded-lg shadow-sm"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-24 rounded-sm overflow-hidden shrink-0 bg-black/[0.04]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-[14px] font-serif font-bold text-foreground tracking-wide mb-1">
                              {item.name}
                            </h3>
                            <span className="inline-block text-[8px] tracking-widest text-primary border border-primary/30 px-2 py-0.5 rounded-sm font-condensed font-bold">
                              {item.abv} VOL
                            </span>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-foreground/20 hover:text-red-400 transition-colors shrink-0"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-black/10 rounded-sm overflow-hidden">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-8 h-8 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-black/[0.03] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-condensed font-bold text-foreground w-8 text-center select-none">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-8 h-8 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-black/[0.03] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-[15px] font-condensed font-bold text-primary">
                              {formatPrice(item.price * item.qty)}
                            </p>
                            {item.qty > 1 && (
                              <p className="text-[10px] text-foreground/30 font-sans">
                                {formatPrice(item.price)} c/u
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="pt-4">
                  <Link
                    href="/destilados"
                    className="flex items-center gap-2 text-[11px] tracking-widest text-foreground/40 hover:text-primary font-condensed font-bold uppercase transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    SEGUIR COMPRANDO
                  </Link>
                </div>
              </div>

              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white border border-black/[0.08] rounded-lg p-6 shadow-sm space-y-5 lg:sticky lg:top-28"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-t-lg overflow-hidden" />

                <h2 className="text-[13px] tracking-[0.25em] font-condensed font-bold text-foreground uppercase">
                  Resumen del Pedido
                </h2>

                <div className="space-y-3 text-sm border-b border-black/5 pb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-foreground/60 text-[12px]">
                      <span className="font-sans truncate max-w-[160px]">{item.name} × {item.qty}</span>
                      <span className="font-condensed font-bold shrink-0">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[11px] tracking-[0.15em] font-condensed text-foreground/40 uppercase">Subtotal</span>
                  <span className="text-2xl font-condensed font-bold text-foreground">{formatPrice(subtotal())}</span>
                </div>

                <p className="text-[9px] text-foreground/25 font-sans leading-relaxed">
                  Envío calculado al finalizar la compra. Solo para Argentina.
                </p>

                <Link
                  href="/checkout"
                  className="w-full py-4 bg-primary text-black font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-foreground hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  FINALIZAR COMPRA
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
