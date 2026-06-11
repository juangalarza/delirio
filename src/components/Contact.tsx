'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Mail, Phone, Send, CheckCircle2, MessageSquare, User } from 'lucide-react'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess(true)
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch (err) {
      setError('Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contacto-seccion" className="py-28 bg-white relative overflow-hidden border-t border-black/5">
      {/* Golden accent ambient */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left Column: Contact Details */}
          <div className="space-y-8 lg:pr-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3.5 py-1 bg-primary/5 border border-primary/20 rounded-full"
              >
                <MessageSquare className="w-3.5 h-3.5 text-primary" />
                <span className="text-[9px] tracking-[0.3em] font-condensed font-bold text-primary uppercase">
                  CONECTA CON NOSOTROS
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-serif font-bold text-foreground tracking-wide leading-tight"
              >
                Escríbenos
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xs md:text-sm text-foreground/50 leading-relaxed font-sans max-w-md"
              >
                ¿Quieres incorporar Delirio en tu bar, tienes alguna consulta sobre nuestros destilados o quieres visitarnos? Estamos aquí para responderte.
              </motion.p>
            </div>

            {/* Info Cards */}
            <div className="space-y-6 pt-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-black/[0.03] border border-black/5 group-hover:border-primary/20 flex items-center justify-center text-primary shrink-0 transition-colors duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[10px] tracking-[0.2em] font-condensed font-bold text-foreground/40 uppercase">Dirección</h4>
                  <p className="text-xs md:text-sm text-foreground/80 font-serif leading-relaxed">
                    Ruta Provincial 12, Km 18<br />
                    Zonda, San Juan, Argentina
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-black/[0.03] border border-black/5 group-hover:border-primary/20 flex items-center justify-center text-primary shrink-0 transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[10px] tracking-[0.2em] font-condensed font-bold text-foreground/40 uppercase">Email</h4>
                  <a
                    href="mailto:hola@deliriogin.com.ar"
                    className="text-xs md:text-sm text-foreground/80 hover:text-primary transition-colors font-mono leading-relaxed"
                  >
                    hola@deliriogin.com.ar
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-black/[0.03] border border-black/5 group-hover:border-primary/20 flex items-center justify-center text-primary shrink-0 transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[10px] tracking-[0.2em] font-condensed font-bold text-foreground/40 uppercase">Teléfono / WhatsApp</h4>
                  <a
                    href="https://wa.me/542644567890"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs md:text-sm text-foreground/80 hover:text-primary transition-colors font-mono leading-relaxed block"
                  >
                    +54 264 456-7890
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full bg-white border border-black/8 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm"
          >
            {/* Top gold line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-sm text-xs leading-relaxed">
                      {error}
                    </div>
                  )}

                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-[10px] tracking-[0.2em] font-condensed text-foreground/50 block">
                      NOMBRE COMPLETO
                    </label>
                    <div className="relative group">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-foreground/25 group-focus-within:text-primary transition-colors">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Ingresa tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={submitting}
                        className="w-full pl-11 pr-4 py-3 bg-black/[0.03] border border-black/10 rounded-sm text-xs text-foreground focus:outline-none focus:border-primary transition-all font-sans placeholder:text-foreground/30"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-[10px] tracking-[0.2em] font-condensed text-foreground/50 block">
                      CORREO ELECTRÓNICO
                    </label>
                    <div className="relative group">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-foreground/25 group-focus-within:text-primary transition-colors">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="ejemplo@deliriogin.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={submitting}
                        className="w-full pl-11 pr-4 py-3 bg-black/[0.03] border border-black/10 rounded-sm text-xs text-foreground focus:outline-none focus:border-primary transition-all font-sans placeholder:text-foreground/30"
                      />
                    </div>
                  </div>

                  {/* Subject field */}
                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="text-[10px] tracking-[0.2em] font-condensed text-foreground/50 block">
                      ASUNTO
                    </label>
                    <div className="relative group">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-foreground/25 group-focus-within:text-primary transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </span>
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        placeholder="Ej. Distribución, Visitas, Eventos..."
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        disabled={submitting}
                        className="w-full pl-11 pr-4 py-3 bg-black/[0.03] border border-black/10 rounded-sm text-xs text-foreground focus:outline-none focus:border-primary transition-all font-sans placeholder:text-foreground/30"
                      />
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-[10px] tracking-[0.2em] font-condensed text-foreground/50 block">
                      MENSAJE
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="Escribe tu mensaje aquí..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={submitting}
                      className="w-full px-4 py-3 bg-black/[0.03] border border-black/10 rounded-sm text-xs text-foreground focus:outline-none focus:border-primary transition-all font-sans placeholder:text-foreground/30 h-[120px] resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-primary hover:bg-foreground text-black hover:text-white font-bold text-xs tracking-[0.25em] uppercase rounded-sm hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2 shadow-[0_4px_15px_rgba(197,160,89,0.15)]"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    ) : (
                      <>
                        ENVIAR MENSAJE
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(197,160,89,0.1)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-foreground tracking-wide">
                    ¡Mensaje Enviado con Éxito!
                  </h3>

                  <p className="text-xs text-foreground/50 leading-relaxed font-sans max-w-xs">
                    Hemos recibido tus datos correctamente. Nuestro equipo se pondrá en contacto contigo a la brevedad para llevar la experiencia Delirio a tu mesa.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 border border-black/10 hover:border-primary/30 text-foreground/60 hover:text-primary rounded-sm text-[10px] tracking-widest font-condensed font-bold uppercase transition-all duration-300 mt-4 cursor-pointer"
                  >
                    ENVIAR OTRO MENSAJE
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
