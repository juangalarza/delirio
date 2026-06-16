'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Truck, Lock, ShoppingBag } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Orbs } from '@/components/Orbs'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'

const SHIPPING_COST = 3500 // TODO: integrate OCAService.calculateShipping

const PROVINCES = [
  'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut',
  'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy',
  'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén',
  'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz',
  'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán',
]

type ContactData = { nombre: string; email: string; telefono: string }
type ShippingData = { calle: string; ciudad: string; provincia: string; codigoPostal: string }

const inputClass =
  'w-full border border-black/10 rounded-sm px-4 py-3 text-sm font-sans text-foreground bg-transparent focus:outline-none focus:border-primary/50 transition-colors placeholder:text-foreground/25'
const labelClass = 'text-[10px] tracking-[0.2em] font-condensed text-foreground/40 uppercase block mb-2'

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotal)

  const [step, setStep] = useState(1)
  const [contact, setContact] = useState<ContactData>({ nombre: '', email: '', telefono: '' })
  const [shipping, setShipping] = useState<ShippingData>({
    calle: '', ciudad: '', provincia: '', codigoPostal: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const total = subtotal() + SHIPPING_COST

  useEffect(() => {
    if (items.length === 0) router.push('/carrito')
  }, [items, router])

  const goNext = (valid: boolean) => {
    setError('')
    if (!valid) {
      setError('Por favor completá todos los campos requeridos.')
      return
    }
    setStep((s) => s + 1)
  }

  const goBack = () => {
    setError('')
    setStep((s) => s - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, qty: i.qty })),
          contact,
          shipping,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al procesar el pago')
      window.location.href = data.init_point
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pago')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar staticLogo />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-24">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2">CHECKOUT</h1>
            <p className="text-foreground/40 text-sm font-sans">Completá tu pedido de forma segura</p>
          </div>

          {/* Progress steps */}
          <div className="flex items-center mb-14">
            {([
              { num: 1, label: 'CONTACTO', Icon: ShoppingBag },
              { num: 2, label: 'ENVÍO', Icon: Truck },
              { num: 3, label: 'PAGO', Icon: Lock },
            ] as const).map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold font-condensed transition-all ${
                      step >= s.num ? 'bg-primary text-black' : 'bg-black/5 text-foreground/30'
                    }`}
                  >
                    {s.num}
                  </div>
                  <span
                    className={`text-[10px] tracking-[0.2em] font-condensed font-bold hidden sm:block transition-colors ${
                      step >= s.num ? 'text-foreground' : 'text-foreground/30'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className={`w-12 sm:w-20 h-px mx-3 transition-colors ${
                      step > s.num ? 'bg-primary' : 'bg-black/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Form */}
            <div className="lg:col-span-3">

              {/* Step 1: Contacto */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <h2 className="text-xl font-serif text-foreground tracking-wide mb-6">
                    Datos de contacto
                  </h2>

                  <div>
                    <label className={labelClass}>Nombre completo *</label>
                    <input
                      type="text"
                      value={contact.nombre}
                      onChange={(e) => setContact({ ...contact, nombre: e.target.value })}
                      className={inputClass}
                      placeholder="Juan García"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Email *</label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      className={inputClass}
                      placeholder="juan@ejemplo.com"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Teléfono *</label>
                    <input
                      type="tel"
                      value={contact.telefono}
                      onChange={(e) => setContact({ ...contact, telefono: e.target.value })}
                      className={inputClass}
                      placeholder="+54 9 11 1234-5678"
                    />
                  </div>

                  {error && <p className="text-red-500 text-xs font-sans">{error}</p>}

                  <div className="pt-2">
                    <button
                      onClick={() =>
                        goNext(!!(contact.nombre && contact.email && contact.telefono))
                      }
                      className="w-full h-12 bg-primary text-black font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-foreground hover:text-white transition-all font-condensed"
                    >
                      CONTINUAR
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Envío */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <h2 className="text-xl font-serif text-foreground tracking-wide mb-6">
                    Dirección de envío
                  </h2>

                  <div>
                    <label className={labelClass}>Calle y número *</label>
                    <input
                      type="text"
                      value={shipping.calle}
                      onChange={(e) => setShipping({ ...shipping, calle: e.target.value })}
                      className={inputClass}
                      placeholder="Av. Libertador 1234, Piso 2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Ciudad *</label>
                      <input
                        type="text"
                        value={shipping.ciudad}
                        onChange={(e) => setShipping({ ...shipping, ciudad: e.target.value })}
                        className={inputClass}
                        placeholder="Buenos Aires"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Código Postal *</label>
                      <input
                        type="text"
                        value={shipping.codigoPostal}
                        onChange={(e) => setShipping({ ...shipping, codigoPostal: e.target.value })}
                        className={inputClass}
                        placeholder="1001"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Provincia *</label>
                    <select
                      value={shipping.provincia}
                      onChange={(e) => setShipping({ ...shipping, provincia: e.target.value })}
                      className={`${inputClass} bg-background`}
                    >
                      <option value="">Seleccioná una provincia</option>
                      {PROVINCES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  {/* Shipping method (OCA stub) */}
                  <div>
                    <label className={labelClass}>Método de envío</label>
                    <div className="border border-primary/30 rounded-sm p-4 flex items-center justify-between bg-primary/5">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-primary shrink-0" />
                        <div>
                          <p className="text-sm font-condensed font-bold text-foreground">OCA Estándar</p>
                          {/* TODO: calcular tarifa real con OCAService.calculateShipping */}
                          <p className="text-[10px] text-foreground/40 font-sans">5-7 días hábiles</p>
                        </div>
                      </div>
                      <span className="text-sm font-condensed font-bold text-primary">
                        {formatPrice(SHIPPING_COST)}
                      </span>
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-xs font-sans">{error}</p>}

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={goBack}
                      className="flex-1 h-12 border border-black/10 text-foreground/50 font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:border-foreground hover:text-foreground transition-all font-condensed"
                    >
                      VOLVER
                    </button>
                    <button
                      onClick={() =>
                        goNext(
                          !!(
                            shipping.calle &&
                            shipping.ciudad &&
                            shipping.provincia &&
                            shipping.codigoPostal
                          )
                        )
                      }
                      className="flex-[2] h-12 bg-primary text-black font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-foreground hover:text-white transition-all font-condensed"
                    >
                      CONTINUAR
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmación */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <h2 className="text-xl font-serif text-foreground tracking-wide mb-6">
                    Confirmá tu pedido
                  </h2>

                  {/* Contact summary */}
                  <div className="border border-black/10 rounded-sm p-4 space-y-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] tracking-[0.2em] font-condensed text-foreground/40 uppercase">
                        Contacto
                      </span>
                      <button
                        onClick={() => { setError(''); setStep(1) }}
                        className="text-[10px] text-primary font-condensed hover:underline"
                      >
                        Editar
                      </button>
                    </div>
                    <p className="text-sm font-sans text-foreground">{contact.nombre}</p>
                    <p className="text-sm font-sans text-foreground/60">
                      {contact.email} · {contact.telefono}
                    </p>
                  </div>

                  {/* Shipping summary */}
                  <div className="border border-black/10 rounded-sm p-4 space-y-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] tracking-[0.2em] font-condensed text-foreground/40 uppercase">
                        Envío
                      </span>
                      <button
                        onClick={() => { setError(''); setStep(2) }}
                        className="text-[10px] text-primary font-condensed hover:underline"
                      >
                        Editar
                      </button>
                    </div>
                    <p className="text-sm font-sans text-foreground">{shipping.calle}</p>
                    <p className="text-sm font-sans text-foreground/60">
                      {shipping.ciudad}, {shipping.provincia} {shipping.codigoPostal}
                    </p>
                    <p className="text-[11px] font-sans text-foreground/40 mt-1">
                      OCA Estándar · {formatPrice(SHIPPING_COST)}
                    </p>
                  </div>

                  {error && (
                    <div className="border border-red-200 bg-red-50 rounded-sm px-4 py-3">
                      <p className="text-red-600 text-xs font-sans">{error}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={goBack}
                      disabled={loading}
                      className="flex-1 h-12 border border-black/10 text-foreground/50 font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:border-foreground hover:text-foreground transition-all font-condensed disabled:opacity-40"
                    >
                      VOLVER
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-[2] h-12 bg-primary text-black font-bold text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-foreground hover:text-white transition-all font-condensed disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle
                              className="opacity-25"
                              cx="12" cy="12" r="10"
                              stroke="currentColor" strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          REDIRIGIENDO…
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          PAGAR CON MERCADO PAGO
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[10px] text-foreground/25 font-sans text-center pt-1">
                    Pago seguro procesado por MercadoPago · Conexión SSL encriptada
                  </p>
                </motion.div>
              )}
            </div>

            {/* Order summary sidebar */}
            <div className="lg:col-span-2">
              <div className="border border-black/10 rounded-sm p-6 sticky top-28">
                <h3 className="text-[10px] tracking-[0.3em] font-condensed font-bold text-foreground/40 uppercase mb-5">
                  Resumen del pedido
                </h3>

                <div className="space-y-4 mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-16 rounded-sm overflow-hidden bg-black/5 shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-condensed font-bold text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-foreground/40 font-sans">
                          {item.abv} · x{item.qty}
                        </p>
                      </div>
                      <span className="text-xs font-condensed font-bold text-foreground shrink-0">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-black/5 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/50 font-sans">Subtotal</span>
                    <span className="font-condensed font-bold text-foreground">
                      {formatPrice(subtotal())}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/50 font-sans">Envío</span>
                    <span className="font-condensed font-bold text-foreground">
                      {formatPrice(SHIPPING_COST)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-black/5 pt-3">
                    <span className="text-sm font-condensed font-bold text-foreground">Total</span>
                    <span className="text-lg font-condensed font-bold text-primary">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
