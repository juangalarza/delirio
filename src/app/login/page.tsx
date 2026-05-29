'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, AlertTriangle, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Orbs } from '@/components/Orbs'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
        router.refresh()
      }, 1000)
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al iniciar sesión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-[#0C0C0C] text-white px-4 py-16 overflow-hidden">
      <Orbs />
      
      {/* Decorative Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[480px]">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <Link href="/" className="mb-6 hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/logo.png"
              alt="Delirio Gin Logo"
              width={140}
              height={140}
              className="object-contain drop-shadow-[0_4px_20px_rgba(197,160,89,0.2)]"
            />
          </Link>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm tracking-[0.4em] text-primary font-condensed mb-2"
          >
            SOCIOS DE LA DESTILERÍA
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-serif font-bold uppercase tracking-widest text-white"
          >
            Iniciar Sesión
          </motion.h1>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-8 md:p-10 rounded-lg border border-white/5 relative overflow-hidden"
        >
          {/* Top subtle gold line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Error Notification */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-start gap-3 bg-red-950/40 border border-red-500/20 text-red-200 p-4 rounded-md text-sm"
                >
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Notification */}
            <AnimatePresence mode="wait">
              {success && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 bg-emerald-950/40 border border-emerald-500/20 text-emerald-200 p-4 rounded-md text-sm"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin shrink-0" />
                  <span>Acceso verificado. Redirigiendo a tu cava privada...</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                CORREO ELECTRÓNICO
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-white/30 group-focus-within:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="ejemplo@deliriogin.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || success}
                  className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-sm text-sm placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-sans text-white disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                  CONTRASEÑA
                </label>
                <Link 
                  href="#" 
                  className="text-[11px] font-condensed tracking-widest text-primary hover:text-white transition-colors"
                >
                  ¿OLVIDASTE TU CONTRASEÑA?
                </Link>
              </div>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-white/30 group-focus-within:text-primary transition-colors">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading || success}
                  className="w-full pl-12 pr-12 py-4 bg-black/40 border border-white/10 rounded-sm text-sm placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-sans text-white disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading || success}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-4 bg-primary text-black font-bold text-xs tracking-[0.25em] uppercase rounded-sm hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              ) : (
                <>
                  INGRESAR A LA CAVA
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Card Footer */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-white/40 tracking-wider">
              ¿No tienes una cuenta de socio?{' '}
              <Link 
                href="/register" 
                className="text-primary hover:text-white underline underline-offset-4 transition-colors font-semibold"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
