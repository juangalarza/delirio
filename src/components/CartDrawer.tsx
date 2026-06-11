'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'

export function CartDrawer() {
  const { isOpen, closeCart, items, updateQty, removeItem, subtotal } = useCartStore()
  const totalQty = items.reduce((s, i) => s + i.qty, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-50"
          />

          <motion.div
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span className="text-[13px] tracking-[0.25em] font-condensed font-bold text-foreground uppercase">
                  Tu Carrito
                </span>
                {totalQty > 0 && (
                  <span className="text-[10px] bg-primary text-black font-bold px-2 py-0.5 rounded-full font-condensed">
                    {totalQty}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors text-foreground/40 hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Empty state */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center">
                  <ShoppingBag className="w-7 h-7 text-primary/30" />
                </div>
                <div>
                  <p className="text-sm font-serif text-foreground/60 mb-1">Tu carrito está vacío</p>
                  <p className="text-xs text-foreground/35 font-sans">Explorá nuestra colección de destilados.</p>
                </div>
                <Link
                  href="/destilados"
                  onClick={closeCart}
                  className="px-6 py-2.5 border border-primary/30 text-primary text-[10px] tracking-widest font-condensed font-bold rounded-sm hover:bg-primary/5 transition-colors"
                >
                  VER DESTILADOS
                </Link>
              </div>
            ) : (
              <>
                {/* Items list */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4 py-4 border-b border-black/5 last:border-0"
                      >
                        {/* Image */}
                        <div className="relative w-16 h-20 rounded-sm overflow-hidden shrink-0 bg-black/[0.04]">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[12px] font-serif font-bold text-foreground tracking-wide">
                                {item.name}
                              </p>
                              <span className="inline-block mt-1 text-[8px] tracking-widest text-primary border border-primary/30 px-1.5 py-0.5 rounded-sm font-condensed font-bold">
                                {item.abv} VOL
                              </span>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-foreground/20 hover:text-red-400 transition-colors shrink-0 mt-0.5"
                              aria-label="Eliminar producto"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Qty controls */}
                            <div className="flex items-center border border-black/10 rounded-sm overflow-hidden">
                              <button
                                onClick={() => updateQty(item.id, item.qty - 1)}
                                className="w-7 h-7 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-black/[0.03] transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-condensed font-bold text-foreground w-6 text-center select-none">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, item.qty + 1)}
                                className="w-7 h-7 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-black/[0.03] transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <p className="text-[13px] font-condensed font-bold text-primary">
                              {formatPrice(item.price * item.qty)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="px-6 py-5 border-t border-black/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] tracking-[0.2em] font-condensed text-foreground/40 uppercase">
                      Subtotal
                    </span>
                    <span className="text-xl font-condensed font-bold text-foreground">
                      {formatPrice(subtotal())}
                    </span>
                  </div>
                  <p className="text-[9px] text-foreground/25 font-sans">
                    Envío y descuentos calculados al finalizar la compra.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full py-4 bg-primary text-black font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-foreground hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    IR AL CHECKOUT
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={closeCart}
                    className="w-full py-2.5 border border-black/10 text-foreground/40 text-[10px] tracking-widest font-condensed font-bold uppercase rounded-sm hover:border-black/20 hover:text-foreground/60 transition-colors"
                  >
                    SEGUIR COMPRANDO
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
