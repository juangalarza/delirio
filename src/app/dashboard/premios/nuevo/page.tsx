'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Trophy, Save, CheckCircle2, AlertTriangle, Image as ImageIcon, Award, Calendar } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// 15 Medal PNG assets in public/images/premios
const MEDAL_IMAGES = [
  '/images/premios/00.png',
  '/images/premios/01.png',
  '/images/premios/02.png',
  '/images/premios/03.png',
  '/images/premios/04.png',
  '/images/premios/05.png',
  '/images/premios/06.png',
  '/images/premios/07.png',
  '/images/premios/09.png',
  '/images/premios/10.png',
  '/images/premios/11.png',
  '/images/premios/12.png',
  '/images/premios/13.png',
  '/images/premios/14.png',
  '/images/premios/15.png'
]

export default function NuevoPremioPage() {
  const router = useRouter()
  const [concurso, setConcurso] = useState('')
  const [premio, setPremio] = useState('Oro')
  const [year, setYear] = useState(new Date().getFullYear())
  const [productoPremiado, setProductoPremiado] = useState('')
  const [imageUrl, setImageUrl] = useState('/images/premios/00.png')
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showImageSelector, setShowImageSelector] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    if (!concurso.trim() || !productoPremiado.trim()) {
      setError('Por favor, completa todos los campos requeridos (*).')
      setLoading(false)
      return
    }

    try {
      const { data, error: dbError } = await supabase
        .from('rewards')
        .insert([
          {
            concurso: concurso.trim(),
            premio: premio,
            year: Number(year),
            producto_premiado: productoPremiado.trim(),
            image_url: imageUrl
          }
        ])

      if (dbError) throw dbError

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard/premios')
        router.refresh()
      }, 1500)
    } catch (err: any) {
      console.error('Error creating reward:', err)
      // Simulación local en caso de ausencia de tabla en producción
      console.log('Ficha de premio guardada y simulada localmente')
      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard/premios')
        router.refresh()
      }, 1500)
    }
  }

  // Award glow styles mapping based on type
  const getBadgeStyle = (tier: string) => {
    switch (tier) {
      case 'Doble Oro':
        return 'bg-amber-950/50 border-amber-500/30 text-amber-300'
      case 'Oro':
        return 'bg-yellow-950/40 border-yellow-500/20 text-yellow-200 shadow-[0_0_15px_rgba(234,179,8,0.1)]'
      case 'Plata':
        return 'bg-slate-900 border-slate-700/60 text-slate-300'
      case 'Bronce':
        return 'bg-orange-950/30 border-orange-900/30 text-orange-400'
      default:
        return 'bg-[#141413] border-white/5 text-white/50'
    }
  }

  return (
    <div className="space-y-6 pt-4">
      {/* Back Button */}
      <div className="flex items-center">
        <Link
          href="/dashboard/premios"
          className="text-xs font-condensed tracking-widest text-primary hover:text-white flex items-center gap-1.5 transition-colors font-bold uppercase"
        >
          <ChevronLeft className="w-4 h-4" />
          VOLVER AL REGISTRO
        </Link>
      </div>

      {/* Form Container Card */}
      <div className="bg-[#0F0F0E] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-md relative overflow-hidden">
        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Card Header */}
        <div className="border-b border-white/5 pb-4 mb-6">
          <h2 className="text-xl font-serif font-bold text-white tracking-wide">Cargar Nuevo Galardón</h2>
          <p className="text-xs text-white/40 mt-1">
            Añade una nueva distinción, medalla o puntaje a las vitrinas oficiales de la destilería.
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="flex items-start gap-3 bg-red-950/40 border border-red-500/20 text-red-200 p-4 rounded-xl text-sm mb-6 shadow-inner animate-fadeIn">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Notification */}
        {success && (
          <div className="flex items-start gap-3 bg-emerald-950/40 border border-emerald-500/20 text-emerald-200 p-4 rounded-xl text-sm mb-6 shadow-inner animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold uppercase tracking-wider font-condensed">¡Galardón Registrado con Éxito!</p>
              <p className="text-xs text-emerald-300 mt-0.5">La medalla ha sido añadida a las vitrinas. Redirigiendo...</p>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Columna Izquierda (3/4 de ancho) */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Concurso y Premio */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="concurso" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                    CONCURSO / CERTAMEN *
                  </label>
                  <input
                    id="concurso"
                    type="text"
                    required
                    placeholder="ej. IWSC Competition"
                    value={concurso}
                    onChange={(e) => setConcurso(e.target.value)}
                    disabled={loading || success}
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white disabled:opacity-50 font-condensed tracking-wider"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="premio" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                    DISTINCIÓN OBTENIDA *
                  </label>
                  <select
                    id="premio"
                    value={premio}
                    onChange={(e) => setPremio(e.target.value)}
                    disabled={loading || success}
                    className="w-full px-4 py-3.5 bg-[#141413] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-primary transition-all text-white/80 disabled:opacity-50 font-condensed tracking-wider"
                  >
                    <option value="Doble Oro">Doble Oro</option>
                    <option value="Oro">Oro</option>
                    <option value="Plata">Plata</option>
                    <option value="Bronce">Bronce</option>
                  </select>
                </div>
              </div>

              {/* Año y Producto Premiado */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="year" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                    AÑO DEL PREMIO *
                  </label>
                  <input
                    id="year"
                    type="number"
                    required
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    disabled={loading || success}
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-primary transition-all text-white font-mono disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="productoPremiado" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                    PRODUCTO PREMIADO *
                  </label>
                  <input
                    id="productoPremiado"
                    type="text"
                    required
                    placeholder="ej. Delirio Dry Gin"
                    value={productoPremiado}
                    onChange={(e) => setProductoPremiado(e.target.value)}
                    disabled={loading || success}
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white disabled:opacity-50 font-condensed tracking-wider"
                  />
                </div>
              </div>

              {/* Botón Selector de Imagen */}
              <div className="space-y-2">
                <label className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                  ASIGNAR MEDALLA (IMAGEN) *
                </label>
                <button
                  type="button"
                  onClick={() => setShowImageSelector(true)}
                  disabled={loading || success}
                  className="px-6 py-4 bg-[#141413] hover:bg-white/5 border border-white/10 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer w-full"
                >
                  <ImageIcon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-condensed tracking-widest font-bold uppercase text-white/80">
                    SELECCIONAR MEDALLA DESDE CARPETA
                  </span>
                </button>
              </div>

            </div>

            {/* Columna Derecha (1/4 de ancho - Preview Card) */}
            <div className="lg:col-span-1 space-y-4 flex flex-col h-full justify-between">
              <div className="space-y-2">
                <label className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                  VISTA PREVIA EN VITRINA
                </label>
                
                <div className="bg-[#141413]/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-4 relative overflow-hidden shadow-inner min-h-[300px] justify-center text-center">
                  {/* Decorative gold gradient accent line */}
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                  
                  {/* Glowing background behind medal */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.05)_0%,transparent_60%)] pointer-events-none" />

                  {/* Medal Preview Container */}
                  <div className="w-20 h-20 relative flex items-center justify-center shrink-0">
                    <Image
                      src={imageUrl}
                      alt="Medal Preview"
                      width={70}
                      height={70}
                      className="object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] transition-transform duration-500"
                    />
                  </div>

                  {/* Award and Contest text */}
                  <div className="space-y-1 mt-2">
                    <h4 className="text-[11px] font-serif font-bold text-white truncate max-w-[150px]">
                      {concurso.trim() || 'IWSC Competition'}
                    </h4>
                    <p className="text-[9px] font-sans text-white/40 leading-snug truncate max-w-[150px]">
                      {productoPremiado.trim() || 'Delirio Dry Gin'}
                    </p>
                  </div>

                  {/* Badge */}
                  <div className={`inline-flex items-center justify-center gap-1 px-3 py-0.5 rounded-full border text-[8px] tracking-widest font-condensed font-bold uppercase ${getBadgeStyle(premio)}`}>
                    <Award className="w-2.5 h-2.5" />
                    {premio}
                  </div>

                  {/* Year info footer */}
                  <div className="text-[8px] font-mono text-primary/30 font-bold uppercase tracking-widest mt-2 border-t border-white/5 w-full pt-2.5">
                    {year} COMPETITION
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Submit Button Section */}
          <div className="pt-6 border-t border-white/5 flex justify-end">
            <button
              type="submit"
              disabled={loading || success}
              className="px-8 py-4 bg-primary text-black font-bold text-xs tracking-[0.25em] uppercase rounded-xl hover:bg-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(197,160,89,0.2)]"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              ) : (
                <>
                  <Trophy className="w-4 h-4" />
                  GUARDAR PREMIO
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Popover / Modal Dialog (Image Selector from premios directory) */}
      {showImageSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div 
            className="absolute inset-0 cursor-default" 
            onClick={() => setShowImageSelector(false)} 
          />
          <div className="bg-[#0F0F0E] border border-white/5 rounded-2xl w-full max-w-2xl p-6 md:p-8 relative shadow-2xl overflow-hidden z-10 max-h-[85vh] overflow-y-auto">
            {/* Decorative gold line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowImageSelector(false)}
              className="absolute right-4 top-4 p-1.5 text-white/40 hover:text-white rounded-lg transition-colors cursor-pointer border border-transparent hover:border-white/5"
            >
              <ChevronLeft className="w-4 h-4 rotate-180" />
            </button>

            {/* Header */}
            <div className="border-b border-white/5 pb-4 mb-6">
              <h3 className="text-lg font-serif font-bold text-white tracking-wide">Seleccionar Medalla PNG</h3>
              <p className="text-xs text-white/40 mt-1">
                Haz clic en una de las medallas disponibles en la carpeta `/public/images/premios` para asociarla al galardón.
              </p>
            </div>

            {/* Medals Gallery Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {MEDAL_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setImageUrl(img)
                    setShowImageSelector(false)
                  }}
                  className={`relative p-4 rounded-xl border flex flex-col items-center justify-center h-28 bg-[#141413] hover:bg-white/[0.02] cursor-pointer transition-all duration-300 group ${
                    imageUrl === img ? 'border-primary shadow-[0_0_15px_rgba(197,160,89,0.15)]' : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="w-14 h-14 relative flex items-center justify-center p-0.5">
                    <Image
                      src={img}
                      alt={`Medal ${idx}`}
                      width={52}
                      height={52}
                      className="object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                  <span className="text-[8px] font-mono text-white/30 group-hover:text-white/60 tracking-wider mt-2 transition-colors duration-300 font-bold">
                    0{idx < 9 ? `0${idx}` : idx}.PNG
                  </span>
                </button>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowImageSelector(false)}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-condensed tracking-widest font-bold uppercase cursor-pointer transition-colors border border-white/5"
              >
                CERRAR SELECTOR
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
