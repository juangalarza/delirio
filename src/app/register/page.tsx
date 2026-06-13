'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, User, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Orbs } from '@/components/Orbs'

type UserRole = 'cliente' | 'administrador'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<UserRole>('cliente')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      setLoading(false)
      return
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
            role: role,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (authError) throw authError

      // Role is set in user_metadata during signUp — use it directly.
      // If a users table row was created by a DB trigger, that takes precedence.
      let destination = '/cuenta'
      try {
        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user!.id)
          .single()

        const resolvedRole = profile?.role ?? data.user?.user_metadata?.role
        if (resolvedRole === 'administrador') destination = '/dashboard'
      } catch {
        if (data.user?.user_metadata?.role === 'administrador') destination = '/dashboard'
      }

      setSuccess(true)
      setTimeout(() => {
        router.push(destination)
        router.refresh()
      }, 2500)
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al registrarse. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-background text-foreground px-4 py-20 overflow-hidden">
      <Orbs />

      {/* Decorative Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[500px]">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="mb-4 hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/logo.png"
              alt="Delirio Gin Logo"
              width={110}
              height={110}
              className="object-contain drop-shadow-[0_4px_20px_rgba(197,160,89,0.2)]"
            />
          </Link>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] tracking-[0.4em] text-primary font-condensed mb-1"
          >
            REGISTRO DE SOCIOS VIP
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-serif font-bold uppercase tracking-widest text-foreground"
          >
            Crear Cuenta
          </motion.h1>
        </div>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 md:p-10 rounded-lg border border-black/8 shadow-sm relative overflow-hidden"
        >
          {/* Top subtle gold line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Error Notification */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-sm"
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
                  className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-md text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">¡Registro completado!</p>
                    <p className="text-xs text-emerald-600 mt-1">Creando tu cuenta en Delirio...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-[12px] tracking-[0.2em] font-condensed text-foreground/50 block">
                NOMBRE COMPLETO
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-foreground/30 group-focus-within:text-primary transition-colors">
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Juan Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading || success}
                  className="w-full pl-12 pr-4 py-3.5 bg-black/[0.03] border border-black/10 rounded-sm text-sm placeholder:text-foreground/25 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-sans text-foreground disabled:opacity-50"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-[12px] tracking-[0.2em] font-condensed text-foreground/50 block">
                CORREO ELECTRÓNICO
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-foreground/30 group-focus-within:text-primary transition-colors">
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
                  className="w-full pl-12 pr-4 py-3.5 bg-black/[0.03] border border-black/10 rounded-sm text-sm placeholder:text-foreground/25 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-sans text-foreground disabled:opacity-50"
                />
              </div>
            </div>

            {/* Role Selector */}
            <div className="space-y-2">
              <label className="text-[12px] tracking-[0.2em] font-condensed text-foreground/50 block">
                ROL DE SOCIO
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('cliente')}
                  disabled={loading || success}
                  className={`py-3 px-4 border rounded-sm transition-all duration-300 text-left flex flex-col justify-center cursor-pointer ${
                    role === 'cliente'
                      ? 'border-primary bg-primary/8 text-foreground shadow-[0_0_15px_rgba(197,160,89,0.10)]'
                      : 'border-black/10 bg-black/[0.02] text-foreground/50 hover:border-black/20 hover:text-foreground'
                  }`}
                >
                  <span className="text-[13px] tracking-widest font-condensed font-bold">CLIENTE VIP</span>
                  <span className="text-[10px] text-foreground/40 mt-0.5 leading-tight">Acceso a beneficios y preventas exclusivas.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('administrador')}
                  disabled={loading || success}
                  className={`py-3 px-4 border rounded-sm transition-all duration-300 text-left flex flex-col justify-center cursor-pointer ${
                    role === 'administrador'
                      ? 'border-primary bg-primary/8 text-foreground shadow-[0_0_15px_rgba(197,160,89,0.10)]'
                      : 'border-black/10 bg-black/[0.02] text-foreground/50 hover:border-black/20 hover:text-foreground'
                  }`}
                >
                  <span className="text-[13px] tracking-widest font-condensed font-bold">ADMINISTRADOR</span>
                  <span className="text-[10px] text-foreground/40 mt-0.5 leading-tight">Control total de ventas, catálogo y operaciones.</span>
                </button>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-[12px] tracking-[0.2em] font-condensed text-foreground/50 block">
                  CONTRASEÑA
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-foreground/30 group-focus-within:text-primary transition-colors">
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
                    className="w-full pl-12 pr-10 py-3 bg-black/[0.03] border border-black/10 rounded-sm text-sm placeholder:text-foreground/25 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-sans text-foreground disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading || success}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/30 hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-[12px] tracking-[0.2em] font-condensed text-foreground/50 block">
                  CONFIRMAR
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-foreground/30 group-focus-within:text-primary transition-colors">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading || success}
                    className="w-full pl-12 pr-10 py-3 bg-black/[0.03] border border-black/10 rounded-sm text-sm placeholder:text-foreground/25 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-sans text-foreground disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading || success}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/30 hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-4 bg-primary text-black font-bold text-xs tracking-[0.25em] uppercase rounded-sm hover:bg-foreground hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              ) : (
                <>
                  CREAR MI CUENTA VIP
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Card Footer */}
          <div className="mt-8 pt-6 border-t border-black/5 text-center">
            <p className="text-xs text-foreground/40 tracking-wider">
              ¿Ya eres socio de Delirio?{' '}
              <Link
                href="/login"
                className="text-primary hover:text-foreground underline underline-offset-4 transition-colors font-semibold"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
