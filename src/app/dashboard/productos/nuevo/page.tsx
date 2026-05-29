'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Save, AlertTriangle, CheckCircle2, Image as ImageIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function NuevoProductoPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('Individual de 750ml')
  const [imageUrl, setImageUrl] = useState('/images/productos/generated-1778549037715.png')
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [isExclusive, setIsExclusive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Auto-generate slug from Name when typing
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setName(val)
    // Convert to lowercase, remove accents, replace spaces and special characters with hyphens
    const generatedSlug = val
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove accent diacritics
      .replace(/[^a-z0-9\s-]/g, '')    // remove invalid chars
      .trim()
      .replace(/\s+/g, '-')             // replace multiple spaces with single hyphen
      .replace(/-+/g, '-')             // replace multiple hyphens with single hyphen
    setSlug(generatedSlug)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    // Form validations
    if (!name.trim() || !slug.trim() || !price || !stock) {
      setError('Por favor, completa todos los campos requeridos.')
      setLoading(false)
      return
    }

    const priceNum = parseFloat(price)
    const stockNum = parseInt(stock)

    if (isNaN(priceNum) || priceNum <= 0) {
      setError('El precio debe ser un número positivo.')
      setLoading(false)
      return
    }

    if (isNaN(stockNum) || stockNum < 0) {
      setError('El stock no puede ser un número negativo.')
      setLoading(false)
      return
    }

    // Default image if empty
    const imgToSave = imageUrl.trim() || '/images/productos/generated-1778549037715.png'

    try {
      const { data, error: dbError } = await supabase
        .from('products')
        .insert([
          {
            name: name.trim(),
            slug: slug.trim(),
            description: description.trim(),
            price: priceNum,
            stock: stockNum,
            category: category.trim(),
            image_url: imgToSave,
            is_exclusive: isExclusive,
          }
        ])

      if (dbError) throw dbError

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard/productos')
        router.refresh()
      }, 1500)
    } catch (err: any) {
      console.error('Error creating product:', err)
      setError(err.message || 'Error de base de datos al guardar el producto. Asegúrate de haber ejecutado el script SQL en Supabase.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 pt-4">
      {/* Back Button */}
      <div className="flex items-center">
        <Link
          href="/dashboard/productos"
          className="text-xs font-condensed tracking-widest text-primary hover:text-white flex items-center gap-1.5 transition-colors font-bold uppercase"
        >
          <ChevronLeft className="w-4 h-4" />
          VOLVER AL INVENTARIO
        </Link>
      </div>

      {/* Form Container Card */}
      <div className="bg-[#0F0F0E] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-md relative overflow-hidden">
        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Card Header */}
        <div className="border-b border-white/5 pb-4 mb-6">
          <h2 className="text-xl font-serif font-bold text-white tracking-wide">Nuevo Producto</h2>
          <p className="text-xs text-white/40 mt-1">
            Registra una nueva botella de gin o artículo e-commerce completando los detalles requeridos en la base de datos.
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="flex items-start gap-3 bg-red-950/40 border border-red-500/20 text-red-200 p-4 rounded-xl text-sm mb-6">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Notification */}
        {success && (
          <div className="flex items-start gap-3 bg-emerald-950/40 border border-emerald-500/20 text-emerald-200 p-4 rounded-xl text-sm mb-6">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">¡Producto Guardado!</p>
              <p className="text-xs text-emerald-300 mt-0.5">Guardado con éxito en Supabase. Redirigiendo...</p>
            </div>
          </div>
        )}

        {/* Product Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Columna Izquierda (3/4 de ancho en pantallas grandes) */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Name & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                    NOMBRE DEL PRODUCTO *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="ej. Delirio Pink Blossom"
                    value={name}
                    onChange={handleNameChange}
                    disabled={loading || success}
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white disabled:opacity-50 font-condensed tracking-wider"
                  />
                </div>

                {/* Product Slug */}
                <div className="space-y-2">
                  <label htmlFor="slug" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                    SLUG DEL PRODUCTO (URL) *
                  </label>
                  <input
                    id="slug"
                    type="text"
                    required
                    placeholder="ej. delirio-pink-blossom"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    disabled={loading || success}
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white font-mono disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Price & Stock inline */}
              <div className="grid grid-cols-2 gap-6">
                {/* Price */}
                <div className="space-y-2">
                  <label htmlFor="price" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                    PRECIO (ARS) *
                  </label>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    required
                    placeholder="ej. 32000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={loading || success}
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white disabled:opacity-50"
                  />
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <label htmlFor="stock" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                    STOCK INICIAL *
                  </label>
                  <input
                    id="stock"
                    type="number"
                    required
                    placeholder="ej. 50"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    disabled={loading || success}
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Category & Exclusivity inline */}
              <div className="grid grid-cols-2 gap-6">
                {/* Category Select */}
                <div className="space-y-2">
                  <label htmlFor="category" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                    CATEGORÍA *
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={loading || success}
                    className="w-full px-4 py-3.5 bg-[#141413] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-primary transition-all text-white/80 disabled:opacity-50 font-condensed tracking-wider"
                  >
                    <option value="Individual de 750ml">Individual de 750ml</option>
                    <option value="Individual de 750ml + Botanicos">Individual de 750ml + Botanicos</option>
                    <option value="Individual de 750ml + Botanicos + Jigger">Individual de 750ml + Botanicos + Jigger</option>
                    <option value="Box 4 en 1">Box 4 en 1</option>
                    <option value="Box: Individual 750 + Copa Tallada + Botanicos + Jigger">Box: Individual 750 + Copa Tallada + Botanicos + Jigger</option>
                    <option value="Negroni 750ml">Negroni 750ml</option>
                    <option value="Vodka 750ml">Vodka 750ml</option>
                    <option value="Growler 2Lts">Growler 2Lts</option>
                  </select>
                </div>

                {/* Exclusive product check toggle */}
                <div className="space-y-2">
                  <label className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                    EXCLUSIVIDAD
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsExclusive(!isExclusive)}
                    disabled={loading || success}
                    className={`w-full h-[48px] px-4 border rounded-xl transition-all duration-300 text-left flex items-center justify-between cursor-pointer ${
                      isExclusive
                        ? 'border-primary bg-primary/10 text-white shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                        : 'border-white/10 bg-black/20 text-white/50 hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[11px] tracking-widest font-condensed font-bold uppercase truncate">EXCLUSIVO SOCIOS</span>
                      <span className="text-[9px] text-white/30 leading-none truncate">Solo catálogo privado</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${isExclusive ? 'border-primary bg-primary' : 'border-white/20'}`}>
                      {isExclusive && <span className="w-2 h-2 bg-black rounded-full" />}
                    </div>
                  </button>
                </div>
              </div>

              {/* Description Textarea */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                  DESCRIPCIÓN DEL PRODUCTO
                </label>
                <textarea
                  id="description"
                  rows={8}
                  placeholder="Describe detalladamente el perfil aromático, botánicos utilizados, notas de cata y maridaje..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading || success}
                  className="w-full h-[215px] px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white leading-relaxed resize-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Columna Derecha (1/4 de ancho en pantallas grandes) */}
            <div className="lg:col-span-1 space-y-4 flex flex-col h-full justify-between">
              <div className="space-y-2">
                <label className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                  VISTA PREVIA
                </label>
                
                <div className="bg-[#141413]/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center gap-4 relative overflow-hidden shadow-inner min-h-[380px] justify-between">
                  {/* Decorative gold gradient accent line */}
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                  
                  {/* Image Frame with reflection/luxury styling */}
                  <div className="w-full aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center relative group shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
                    {imageUrl ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageUrl}
                          alt="Vista previa de botella premium"
                          className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                          <span className="text-[9px] tracking-widest font-condensed text-primary uppercase font-bold">VISTA PREVIA DELIRIO</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-white/20">
                        <ImageIcon className="w-10 h-10 stroke-[1.2]" />
                        <span className="text-[10px] uppercase font-condensed tracking-widest font-bold">SIN FOTO</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Selection Action Button */}
                  <button
                    type="button"
                    onClick={() => setImageModalOpen(true)}
                    disabled={loading || success}
                    className="w-full py-3.5 bg-black/60 hover:bg-black/90 border border-white/10 hover:border-primary/50 text-white/80 hover:text-white rounded-xl text-xs font-condensed tracking-[0.2em] font-bold uppercase transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(197,160,89,0.15)] mt-auto"
                  >
                    {imageUrl ? 'Cambiar Foto' : 'Seleccionar Foto'}
                  </button>
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
                  <Save className="w-4 h-4" />
                  GUARDAR PRODUCTO
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Image Selection Modal */}
      {imageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="bg-[#0F0F0E] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gold line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-white tracking-wide">Seleccionar Imagen de Producto</h3>
                <p className="text-xs text-white/40 mt-1">
                  Elige una de las botellas premium o estuches de Delirio disponibles en el servidor.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="text-white/40 hover:text-white text-xs font-condensed tracking-wider font-bold border border-white/10 hover:border-white/20 rounded-lg px-3 py-1.5 transition-colors uppercase cursor-pointer"
              >
                Cerrar
              </button>
            </div>
            
            {/* Modal Content - Scrollable Grid */}
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {AVAILABLE_IMAGES.map((imgName) => {
                  const fullUrl = `/images/productos/${imgName}`
                  const isSelected = imageUrl === fullUrl
                  
                  return (
                    <button
                      key={imgName}
                      type="button"
                      onClick={() => {
                        setImageUrl(fullUrl)
                        setImageModalOpen(false)
                      }}
                      className={`relative aspect-square rounded-xl overflow-hidden border group transition-all duration-300 flex flex-col items-center justify-center p-2 bg-black/40 hover:bg-black/60 cursor-pointer ${
                        isSelected 
                          ? 'border-primary ring-1 ring-primary shadow-[0_0_15px_rgba(197,160,89,0.25)]' 
                          : 'border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="relative w-full h-[80%] rounded-lg overflow-hidden bg-black/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={fullUrl}
                          alt={imgName}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Name of image */}
                      <span className="text-[9px] font-mono tracking-tighter text-white/40 truncate w-full text-center mt-2 group-hover:text-white/70 transition-colors">
                        {imgName.replace('generated-', '').replace('.png', '')}
                      </span>
                      
                      {/* Selection indicator dot */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center border border-black shadow">
                          <div className="w-2.5 h-2.5 bg-black rounded-full" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 bg-black/20 border-t border-white/5 flex justify-between items-center text-xs text-white/30">
              <span>Total: {AVAILABLE_IMAGES.length} imágenes cargadas</span>
              <span className="italic font-condensed tracking-wider">DELIRIO GIN PREMIUM</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const AVAILABLE_IMAGES = [
  'generated-1778549037715.png',
  'generated-1778549044108.png',
  'generated-1778549057001.png',
  'generated-1778549058690.png',
  'generated-1778549072341.png',
  'generated-1778549075774.png',
  'generated-1778549076048.png',
  'generated-1778549078456.png',
  'generated-1778549080715.png',
  'generated-1778549788271.png',
  'generated-1778549807847.png',
  'generated-1778549983688.png',
  'generated-1778549987054.png',
  'generated-1778549998390.png',
  'generated-1778550000337.png',
  'generated-1778550030318.png',
  'generated-1778550047649.png',
  'generated-1778550051255.png',
  'generated-1778550054491.png',
  'generated-1778550851893.png',
  'generated-1778551165166.png',
  'generated-1778551167623.png',
  'generated-1778551171506.png',
  'generated-1778553602903.png',
  'generated-1778553603231.png',
  'generated-1778553614556.png',
  'generated-1778553615583.png',
  'generated-1778553922322.png',
  'generated-1778553922926.png'
]
