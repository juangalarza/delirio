'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LogOut, User, ShoppingBag, Settings, ChevronDown, 
  ChevronRight, Menu, X, Search, Bell, TrendingUp, Users, Package, Trophy
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<{ name: string; role: string } | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const router = useRouter()
  const pathname = usePathname()

  // Dynamic active tab highlighting based on current Next.js route path
  const getActiveMenu = () => {
    if (pathname === '/dashboard') return 'dashboard'
    if (pathname.startsWith('/dashboard/productos')) return 'producto'
    if (pathname.startsWith('/dashboard/pedidos')) return 'pedidos'
    if (pathname.startsWith('/dashboard/clientes')) return 'clientes'
    if (pathname.startsWith('/dashboard/premios')) return 'premios'
    if (pathname.startsWith('/dashboard/ajustes')) return 'ajustes'
    return 'dashboard'
  }

  const activeMenu = getActiveMenu()

  useEffect(() => {
    let active = true

    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          if (active) router.push('/login')
        } else {
          if (active) {
            setUser(session.user)
            
            // Intentar obtener el perfil en tiempo real de la base de datos
            try {
              const { data: dbUser } = await supabase
                .from('users')
                .select('first_name, last_name, role')
                .eq('id', session.user.id)
                .single()
              
              if (dbUser) {
                const fullName = `${dbUser.first_name || ''} ${dbUser.last_name || ''}`.trim()
                setProfile({
                  name: fullName || 'Socio Delirio',
                  role: dbUser.role || 'cliente',
                })
              } else {
                const metadata = session.user.user_metadata
                setProfile({
                  name: metadata?.display_name || 'Socio Delirio',
                  role: metadata?.role || 'cliente',
                })
              }
            } catch (profileErr) {
              const metadata = session.user.user_metadata
              setProfile({
                name: metadata?.display_name || 'Socio Delirio',
                role: metadata?.role || 'cliente',
              })
            }
            setLoading(false)
          }
        }
      } catch (err) {
        console.error('Error checking authentication:', err)
        if (active) router.push('/login')
      }
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!active) return
      
      if (event === 'SIGNED_OUT' || !session) {
        router.push('/login')
      } else if (session) {
        setUser(session.user)
        
        try {
          const { data: dbUser } = await supabase
            .from('users')
            .select('first_name, last_name, role')
            .eq('id', session.user.id)
            .single()
          
          if (dbUser) {
            const fullName = `${dbUser.first_name || ''} ${dbUser.last_name || ''}`.trim()
            setProfile({
              name: fullName || 'Socio Delirio',
              role: dbUser.role || 'cliente',
            })
          } else {
            const metadata = session.user.user_metadata
            setProfile({
              name: metadata?.display_name || 'Socio Delirio',
              role: metadata?.role || 'cliente',
            })
          }
        } catch {
          const metadata = session.user.user_metadata
          setProfile({
            name: metadata?.display_name || 'Socio Delirio',
            role: metadata?.role || 'cliente',
          })
        }
        setLoading(false)
      }
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [router])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.error('Error during signOut:', err)
    } finally {
      if (typeof window !== 'undefined') {
        // Borrar llaves de sesión locales de Supabase para forzar limpieza
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
          if (key.startsWith('sb-')) {
            localStorage.removeItem(key)
          }
        })
      }
      router.push('/login')
      router.refresh()
    }
  }

  // Sidebar Menu Items matching the reference layout style
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp, href: '/dashboard' },
    { id: 'producto', label: 'Producto', icon: Package, href: '/dashboard/productos' },
    { id: 'pedidos', label: 'Pedidos', icon: ShoppingBag, href: '/dashboard/pedidos' },
    { id: 'clientes', label: 'Clientes', icon: Users, href: '/dashboard/clientes' },
    { id: 'premios', label: 'Premios', icon: Trophy, href: '/dashboard/premios' },
    { id: 'ajustes', label: 'Ajustes', icon: Settings, href: '/dashboard/ajustes' },
  ]

  if (loading || !user || !profile) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#060606]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            {/* Outer spinning gold glow */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            {/* Inner reverse spinning glow */}
            <div className="absolute inset-2 rounded-full border-2 border-white/5 border-b-white/40 animate-spin [animation-duration:1.5s]" />
          </div>
          <p className="text-white/60 text-xs tracking-[0.4em] font-condensed animate-pulse">
            CARGANDO TU PORTAL DELIRIO...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col lg:flex-row font-sans overflow-x-hidden p-0 lg:p-4">
      
      {/* ------------------------------------------------------------- */}
      {/* FLOATING SIDEBAR (Panel izquierdo flotante compartido)        */}
      {/* ------------------------------------------------------------- */}
      <aside className={`
        w-64 bg-[#0F0F0E]/95 backdrop-blur-md rounded-2xl border border-white/5 p-5 flex flex-col justify-between z-50
        fixed top-4 bottom-4 transition-all duration-300
        ${sidebarOpen ? 'left-4' : '-left-80 lg:left-4'}
        h-[calc(100vh-2rem)]
      `}>
        <div>
          {/* Header Branding */}
          <div className="flex items-center justify-center px-3 pb-4 border-b border-white/5 mb-6 relative">
            <Link href="/" className="hover:opacity-85 transition-opacity">
              <Image
                src="/images/logo.png"
                alt="Logo Delirio"
                width={120}
                height={120}
                className="object-contain drop-shadow-[0_2px_10px_rgba(197,160,89,0.1)]"
                priority
              />
            </Link>

            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 lg:hidden p-1.5 text-white/50 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Dropdown in Sidebar */}
          <div className="relative mb-6">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-3 text-left min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold font-serif shrink-0">
                  {profile.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate leading-none">{profile.name}</p>
                  <p className="text-[9px] text-white/40 mt-1 uppercase tracking-wider truncate capitalize">{profile.role}</p>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-white/40 group-hover:text-primary transition-colors shrink-0" />
            </button>

            {/* Click Outside Backdrop Overlay */}
            {profileDropdownOpen && (
              <div 
                className="fixed inset-0 z-20 cursor-default" 
                onClick={() => setProfileDropdownOpen(false)}
              />
            )}

            {/* Dropdown Menu */}
            <AnimatePresence>
              {profileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 mt-2 bg-[#121211] border border-white/5 rounded-xl p-2 shadow-2xl z-30 flex flex-col gap-1"
                >
                  <Link
                    href="/dashboard"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full text-left py-2 px-3 hover:bg-white/5 rounded-lg text-xs font-condensed tracking-wider text-white/70 hover:text-white transition-colors cursor-pointer block"
                  >
                    MI PERFIL
                  </Link>
                  <Link
                    href="/dashboard/ajustes"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full text-left py-2 px-3 hover:bg-white/5 rounded-lg text-xs font-condensed tracking-wider text-white/70 hover:text-white transition-colors cursor-pointer block"
                  >
                    AJUSTES
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeMenu === item.id
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    w-full py-3.5 px-4 rounded-xl flex items-center gap-3.5 text-left transition-all duration-300 font-condensed text-sm tracking-wider cursor-pointer block
                    ${isActive
                      ? 'bg-primary text-black font-bold shadow-[0_4px_20px_rgba(197,160,89,0.35)]'
                      : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                    }
                  `}
                >
                  <span className="flex items-center gap-3.5">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-primary'}`} />
                    <span>{item.label.toUpperCase()}</span>
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Logout */}
        <div className="border-t border-white/5 pt-4">
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 border border-red-500/10 hover:border-red-500/30 bg-red-950/5 hover:bg-red-950/20 text-red-400 rounded-xl flex items-center gap-3 text-left transition-all duration-300 font-condensed text-sm tracking-wider cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0 text-red-500" />
            CERRAR SESIÓN
          </button>
        </div>
      </aside>

      {/* Sidebar background overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTENT AREA (Sección de contenido)                      */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 min-h-screen lg:ml-72 flex flex-col gap-6 p-4 lg:p-6 transition-all duration-300">
        
        {/* HEADER BAR (Breadcrumbs, buscador, iconos - COMPARTIDO) */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0F0F0E]/40 border border-white/5 backdrop-blur-md px-6 py-4 rounded-2xl relative">
          <div className="flex items-center gap-3">
            {/* Toggle Sidebar mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-[#141413] border border-white/5 text-primary hover:text-white transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-white/40 tracking-wider font-condensed">
                <span>Inicio</span>
                <ChevronRight className="w-3 h-3 text-white/20" />
                <span className="text-white/60 capitalize">{activeMenu}</span>
              </div>
              <h1 className="text-xl font-serif font-bold text-white tracking-widest uppercase mt-0.5">
                {activeMenu === 'dashboard' ? 'General' : activeMenu}
              </h1>
            </div>
          </div>

          <div className="flex items-center w-full md:w-auto justify-between md:justify-end gap-4 shrink-0">
            {/* Search Input */}
            <div className="relative group max-w-[220px] w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/30 group-focus-within:text-primary transition-colors">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Buscar aquí..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white"
              />
            </div>

            {/* Header Control Icons */}
            <div className="flex items-center gap-3">
              <button className="p-2 bg-[#141413] border border-white/5 hover:border-primary/20 text-white/60 hover:text-primary rounded-xl transition-all cursor-pointer relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full" />
              </button>
              <button className="p-2 bg-[#141413] border border-white/5 hover:border-primary/20 text-white/60 hover:text-primary rounded-xl transition-all cursor-pointer">
                <Settings className="w-4 h-4" />
              </button>
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold font-serif shadow-[0_0_10px_rgba(197,160,89,0.1)]">
                {profile.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        {children}

      </div>

    </div>
  )
}
