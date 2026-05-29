'use client'

import { useEffect, useState } from 'react'
import { 
  Settings, Key, CreditCard, Bell, 
  Save, CheckCircle2, ShieldCheck, 
  Globe, Database, Server, Sparkles, RefreshCw, Lock, AlertTriangle
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AjustesPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // General parameters state
  const [storeName, setStoreName] = useState('Destilería Delirio')
  const [supportEmail, setSupportEmail] = useState('hola@deliriogin.com.ar')
  const [contactPhone, setContactPhone] = useState('+54 264 456-7890')
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  // Payments parameters state - cargados de forma segura desde variables de entorno (.env.local / Vercel)
  const [mpPublicKey] = useState(
    process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || 'TEST-8844aacc-bb11-4433-8899-5544332211aa'
  )
  const [mpAccessToken] = useState(
    process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN || 'APP_USR-88442211-bbcc-44aa-8811-9988776655aa'
  )
  const [allowTransfer, setAllowTransfer] = useState(true)

  // Database / Security parameters state
  const [rlsActive, setRlsActive] = useState(true)
  const [allowRegistration, setAllowRegistration] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState('24')

  // Notifications parameters state
  const [lowStockAlert, setLowStockAlert] = useState(true)
  const [thresholdStock, setThresholdStock] = useState('15')
  const [emailOnNewOrder, setEmailOnNewOrder] = useState(true)

  // Cargar configuraciones desde Supabase
  const fetchSettings = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: dbError } = await supabase
        .from('settings')
        .select('*')
        .eq('id', 1)
        .single()

      if (dbError) throw dbError

      if (data) {
        setStoreName(data.store_name)
        setSupportEmail(data.support_email)
        setContactPhone(data.contact_phone)
        setMaintenanceMode(data.maintenance_mode)
        setAllowTransfer(data.allow_transfer)
        setRlsActive(data.rls_active)
        setAllowRegistration(data.allow_registration)
        setSessionTimeout(String(data.session_timeout))
        setLowStockAlert(data.low_stock_alert)
        setThresholdStock(String(data.threshold_stock))
        setEmailOnNewOrder(data.email_on_new_order)
      }
    } catch (err: any) {
      console.log('Utilizando valores de configuración locales por defecto en ajustes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)
    setError(null)

    try {
      const { error: dbError } = await supabase
        .from('settings')
        .upsert({
          id: 1,
          store_name: storeName,
          support_email: supportEmail,
          contact_phone: contactPhone,
          maintenance_mode: maintenanceMode,
          allow_transfer: allowTransfer,
          rls_active: rlsActive,
          allow_registration: allowRegistration,
          session_timeout: Number(sessionTimeout),
          low_stock_alert: lowStockAlert,
          threshold_stock: Number(thresholdStock),
          email_on_new_order: emailOnNewOrder,
          updated_at: new Date().toISOString()
        })

      if (dbError) throw dbError

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      console.error('Error al guardar configuraciones:', err)
      // Extrae la información de error en formato legible para el administrador
      const errorMsg = err.message || err.details || (err.error_description) || (typeof err === 'object' ? JSON.stringify(err) : String(err))
      setError(errorMsg)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 pt-4">
      {/* Header Panel */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-white tracking-wide">Ajustes del Sistema</h1>
        <p className="text-xs text-white/40 mt-1">
          Configura las preferencias globales de la plataforma, pasarelas de pago y credenciales de base de datos.
        </p>
      </div>

      {/* Main Settings Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Navigation Sidebar Tabs (1/4 Width) */}
        <div className="lg:col-span-1 bg-[#0F0F0E] border border-white/5 rounded-2xl p-4 space-y-1 shadow-sm">
          {[
            { id: 'general', label: 'General', icon: Globe },
            { id: 'pagos', label: 'Pasarela de Pago', icon: CreditCard },
            { id: 'seguridad', label: 'Seguridad y BD', icon: Database },
            { id: 'notificaciones', label: 'Notificaciones', icon: Bell }
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-condensed tracking-wider font-bold uppercase transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary border-primary text-black shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Configurations Form Panel (3/4 Width) */}
        <div className="lg:col-span-3 bg-[#0F0F0E] border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-md">
          {/* Top gold line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Success glowing alert box */}
          {success && (
            <div className="flex items-start gap-3 bg-emerald-950/40 border border-emerald-500/20 text-emerald-200 p-4 rounded-xl text-xs mb-6 shadow-[0_0_15px_rgba(16,185,129,0.05)] animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold uppercase tracking-wider font-condensed">¡Ajustes Guardados con Éxito!</p>
                <p className="text-emerald-300/80 mt-0.5">Los cambios se aplicaron inmediatamente en el servidor de Delirio.</p>
              </div>
            </div>
          )}

          {/* Error alert box */}
          {error && (
            <div className="flex items-start gap-3 bg-red-950/40 border border-red-500/20 text-red-200 p-4 rounded-xl text-xs mb-6 shadow-[0_0_15px_rgba(239,68,68,0.05)] animate-fadeIn">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold uppercase tracking-wider font-condensed">Error al guardar configuración</p>
                <p className="text-red-300/80 mt-0.5">{error}</p>
                <p className="text-[10px] text-red-400/60 mt-1 font-sans">
                  Tip: Asegúrate de haber ejecutado la migración SQL en Supabase (tabla 'settings') y estar autenticado como administrador.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Tab 1: GENERAL */}
            {activeTab === 'general' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-white/5 pb-3">
                  <h3 className="text-sm tracking-widest font-condensed font-bold text-white uppercase">Información de la Marca</h3>
                  <p className="text-[11px] text-white/30 mt-0.5">Configura la identidad de la tienda e-commerce.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Store Name */}
                  <div className="space-y-2">
                    <label className="text-[11px] tracking-[0.2em] font-condensed text-white/50 block">NOMBRE COMERCIAL</label>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 focus:border-primary rounded-xl text-xs text-white focus:outline-none transition-all font-condensed tracking-wider"
                    />
                  </div>

                  {/* Support Email */}
                  <div className="space-y-2">
                    <label className="text-[11px] tracking-[0.2em] font-condensed text-white/50 block">EMAIL DE SOPORTE</label>
                    <input
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 focus:border-primary rounded-xl text-xs text-white focus:outline-none transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Contact Phone */}
                <div className="space-y-2">
                  <label className="text-[11px] tracking-[0.2em] font-condensed text-white/50 block">TELÉFONO DE CONTACTO</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 focus:border-primary rounded-xl text-xs text-white focus:outline-none transition-all font-mono"
                  />
                </div>

                {/* Maintenance Mode Toggle */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] tracking-[0.2em] font-condensed text-white/50 block">ESTADO DE LA TIENDA</label>
                  <button
                    type="button"
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                    className={`w-full py-3.5 px-4 border rounded-xl transition-all duration-300 text-left flex items-center justify-between cursor-pointer ${
                      maintenanceMode
                        ? 'border-red-500 bg-red-950/15 text-white'
                        : 'border-white/10 bg-black/20 text-white/50 hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs tracking-widest font-condensed font-bold uppercase">MODO MANTENIMIENTO</span>
                      <span className="text-[9px] text-white/30 leading-none">Desactiva el catálogo público temporalmente para clientes externos.</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${maintenanceMode ? 'border-red-500 bg-red-500' : 'border-white/20'}`}>
                      {maintenanceMode && <span className="w-2 h-2 bg-black rounded-full" />}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: PAYMENTS */}
            {activeTab === 'pagos' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-white/5 pb-3">
                  <h3 className="text-sm tracking-widest font-condensed font-bold text-white uppercase">Integración de MercadoPago</h3>
                  <p className="text-[11px] text-white/30 mt-0.5">Conecta tus credenciales de cobro y pasarelas de pago argentinas.</p>
                </div>

                {/* MP Public Key */}
                <div className="space-y-2">
                  <label className="text-[11px] tracking-[0.2em] font-condensed text-white/50 block">MERCADOPAGO PUBLIC KEY</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                    <input
                      type="text"
                      readOnly
                      value={mpPublicKey}
                      className="w-full pl-10 pr-4 py-3 bg-[#141413]/50 border border-white/5 rounded-xl text-xs text-white/50 focus:outline-none transition-all font-mono cursor-not-allowed select-none"
                    />
                  </div>
                  <span className="text-[9px] text-primary/60 font-condensed tracking-wider uppercase block mt-1">
                    🔐 Cargado de forma segura desde .env.local / Vercel
                  </span>
                </div>

                {/* MP Access Token */}
                <div className="space-y-2">
                  <label className="text-[11px] tracking-[0.2em] font-condensed text-white/50 block">MERCADOPAGO ACCESS TOKEN</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                    <input
                      type="password"
                      readOnly
                      value={mpAccessToken}
                      className="w-full pl-10 pr-4 py-3 bg-[#141413]/50 border border-white/5 rounded-xl text-xs text-white/50 focus:outline-none transition-all font-mono cursor-not-allowed select-none"
                    />
                  </div>
                  <span className="text-[9px] text-primary/60 font-condensed tracking-wider uppercase block mt-1">
                    🔐 Cargado de forma segura desde .env.local / Vercel
                  </span>
                </div>

                {/* Bank Transfer Toggle */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] tracking-[0.2em] font-condensed text-white/50 block">TRANSFERENCIAS BANCARIAS</label>
                  <button
                    type="button"
                    onClick={() => setAllowTransfer(!allowTransfer)}
                    className={`w-full py-3.5 px-4 border rounded-xl transition-all duration-300 text-left flex items-center justify-between cursor-pointer ${
                      allowTransfer
                        ? 'border-primary bg-primary/10 text-white'
                        : 'border-white/10 bg-black/20 text-white/50 hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs tracking-widest font-condensed font-bold uppercase">PERMITIR CBU / ALIAS</span>
                      <span className="text-[9px] text-white/30 leading-none">Muestra los datos bancarios para coordinar transferencias directas sin comisión.</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${allowTransfer ? 'border-primary bg-primary' : 'border-white/20'}`}>
                      {allowTransfer && <span className="w-2 h-2 bg-black rounded-full" />}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: DATABASE & SECURITY */}
            {activeTab === 'seguridad' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-white/5 pb-3">
                  <h3 className="text-sm tracking-widest font-condensed font-bold text-white uppercase">Parámetros de Base de Datos</h3>
                  <p className="text-[11px] text-white/30 mt-0.5">Ajustes de conexión RLS de Supabase PostgreSQL.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Supabase Host Status */}
                  <div className="space-y-2">
                    <label className="text-[11px] tracking-[0.2em] font-condensed text-white/50 block">SERVIDOR ACTIVO</label>
                    <div className="flex items-center gap-3 px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-xs text-white/70">
                      <Server className="w-4 h-4 text-emerald-500" />
                      <span className="font-mono truncate">Supabase Cloud (aws-sa-east-1)</span>
                    </div>
                  </div>

                  {/* Session Timeout */}
                  <div className="space-y-2">
                    <label className="text-[11px] tracking-[0.2em] font-condensed text-white/50 block">EXPIRACIÓN DE SESIÓN (HORAS)</label>
                    <input
                      type="number"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 focus:border-primary rounded-xl text-xs text-white focus:outline-none transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Row Level Security toggle */}
                <div className="space-y-2">
                  <label className="text-[11px] tracking-[0.2em] font-condensed text-white/50 block">POLÍTICAS RLS (ROW LEVEL SECURITY)</label>
                  <button
                    type="button"
                    onClick={() => setRlsActive(!rlsActive)}
                    className={`w-full py-3.5 px-4 border rounded-xl transition-all duration-300 text-left flex items-center justify-between cursor-pointer ${
                      rlsActive
                        ? 'border-primary bg-primary/10 text-white'
                        : 'border-white/10 bg-black/20 text-white/50 hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs tracking-widest font-condensed font-bold uppercase">FORZAR SEGURIDAD RLS</span>
                      <span className="text-[9px] text-white/30 leading-none">Los usuarios normales solo pueden ver y editar sus propios perfiles y compras.</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${rlsActive ? 'border-primary bg-primary' : 'border-white/20'}`}>
                      {rlsActive && <span className="w-2 h-2 bg-black rounded-full" />}
                    </div>
                  </button>
                </div>

                {/* Allow registers */}
                <div className="space-y-2">
                  <label className="text-[11px] tracking-[0.2em] font-condensed text-white/50 block">REGISTROS NUEVOS</label>
                  <button
                    type="button"
                    onClick={() => setAllowRegistration(!allowRegistration)}
                    className={`w-full py-3.5 px-4 border rounded-xl transition-all duration-300 text-left flex items-center justify-between cursor-pointer ${
                      allowRegistration
                        ? 'border-primary bg-primary/10 text-white'
                        : 'border-white/10 bg-black/20 text-white/50 hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs tracking-widest font-condensed font-bold uppercase">HABILITAR AUTOREGISTRO</span>
                      <span className="text-[9px] text-white/30 leading-none">Permite a los usuarios registrarse libremente desde el portal principal.</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${allowRegistration ? 'border-primary bg-primary' : 'border-white/20'}`}>
                      {allowRegistration && <span className="w-2 h-2 bg-black rounded-full" />}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 4: NOTIFICATIONS */}
            {activeTab === 'notificaciones' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-white/5 pb-3">
                  <h3 className="text-sm tracking-widest font-condensed font-bold text-white uppercase">Preferencias de Alerta</h3>
                  <p className="text-[11px] text-white/30 mt-0.5">Configura las notificaciones de stock e email administrativo.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email alert for new orders */}
                  <div className="space-y-2">
                    <label className="text-[11px] tracking-[0.2em] font-condensed text-white/50 block">ALERTAS DE CORREO</label>
                    <button
                      type="button"
                      onClick={() => setEmailOnNewOrder(!emailOnNewOrder)}
                      className={`w-full py-3 px-4 border rounded-xl transition-all duration-300 text-left flex items-center justify-between cursor-pointer ${
                        emailOnNewOrder
                          ? 'border-primary bg-primary/10 text-white'
                          : 'border-white/10 bg-black/20 text-white/50'
                      }`}
                    >
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-xs tracking-widest font-condensed font-bold uppercase truncate">CORREO POR ORDEN</span>
                        <span className="text-[9px] text-white/30 leading-none truncate">Alertar al administrador.</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${emailOnNewOrder ? 'border-primary bg-primary' : 'border-white/20'}`}>
                        {emailOnNewOrder && <span className="w-2 h-2 bg-black rounded-full" />}
                      </div>
                    </button>
                  </div>

                  {/* Low Stock Alerts */}
                  <div className="space-y-2">
                    <label className="text-[11px] tracking-[0.2em] font-condensed text-white/50 block">ALERTA STOCK CRÍTICO</label>
                    <button
                      type="button"
                      onClick={() => setLowStockAlert(!lowStockAlert)}
                      className={`w-full py-3 px-4 border rounded-xl transition-all duration-300 text-left flex items-center justify-between cursor-pointer ${
                        lowStockAlert
                          ? 'border-primary bg-primary/10 text-white'
                          : 'border-white/10 bg-black/20 text-white/50'
                      }`}
                    >
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-xs tracking-widest font-condensed font-bold uppercase truncate">BAJO STOCK</span>
                        <span className="text-[9px] text-white/30 leading-none truncate">Alertar si quedan pocas botellas.</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${lowStockAlert ? 'border-primary bg-primary' : 'border-white/20'}`}>
                        {lowStockAlert && <span className="w-2 h-2 bg-black rounded-full" />}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Stock Threshold Input */}
                {lowStockAlert && (
                  <div className="space-y-2 animate-fadeIn">
                    <label className="text-[11px] tracking-[0.2em] font-condensed text-white/50 block">UMBRAL DE STOCK MÍNIMO</label>
                    <input
                      type="number"
                      value={thresholdStock}
                      onChange={(e) => setThresholdStock(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 focus:border-primary rounded-xl text-xs text-white focus:outline-none transition-all font-mono"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Submit Action Button */}
            <div className="pt-6 border-t border-white/5 flex justify-end">
              <button
                type="submit"
                disabled={saving || success}
                className="px-8 py-3.5 bg-primary text-black font-bold text-xs tracking-[0.25em] uppercase rounded-xl hover:bg-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(197,160,89,0.2)]"
              >
                {saving ? (
                  <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    GUARDAR CONFIGURACIÓN
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}
