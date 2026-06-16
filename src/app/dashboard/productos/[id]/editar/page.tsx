'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Save, AlertTriangle, CheckCircle2, Image as ImageIcon } from 'lucide-react'

export default function EditarProductoPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [longDescription, setLongDescription] = useState('')
  const [abv, setAbv] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('Individual de 750ml')
  const [imageUrl, setImageUrl] = useState('')
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [isExclusive, setIsExclusive] = useState(false)

  const [loadingData, setLoadingData] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [availableImages, setAvailableImages] = useState<string[]>([])
  const [imagesLoading, setImagesLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/dashboard/products/${id}`)
      .then((r) => r.json())
      .then(({ data, error: apiErr }) => {
        if (apiErr || !data) {
          setLoadError('Producto no encontrado.')
        } else {
          setName(data.name || '')
          setSlug(data.slug || '')
          setDescription(data.description || '')
          setLongDescription(data.long_description || '')
          setAbv(data.abv || '')
          setPrice(String(data.price || ''))
          setStock(String(data.stock || ''))
          setCategory(data.category || 'Individual de 750ml')
          setImageUrl(data.image_url || '')
          setIsExclusive(data.is_exclusive || false)
        }
        setLoadingData(false)
      })
      .catch(() => {
        setLoadError('No se pudo cargar el producto.')
        setLoadingData(false)
      })
  }, [id])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setName(val)
    const generatedSlug = val
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    setSlug(generatedSlug)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    if (!name.trim() || !slug.trim() || !price || !stock) {
      setError('Por favor, completa todos los campos requeridos.')
      setSaving(false)
      return
    }

    const priceNum = parseFloat(price)
    const stockNum = parseInt(stock)

    if (isNaN(priceNum) || priceNum <= 0) {
      setError('El precio debe ser un número positivo.')
      setSaving(false)
      return
    }

    if (isNaN(stockNum) || stockNum < 0) {
      setError('El stock no puede ser un número negativo.')
      setSaving(false)
      return
    }

    const imgToSave = imageUrl.trim() || '/images/productos/generated-1778549037715.png'

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      const res = await fetch(`/api/dashboard/products/${id}`, {
        method: 'PATCH',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim(),
          long_description: longDescription.trim(),
          abv: abv.trim(),
          price: priceNum,
          stock: stockNum,
          category: category.trim(),
          image_url: imgToSave,
          is_exclusive: isExclusive,
        }),
      })
      clearTimeout(timeoutId)

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || 'Error al actualizar')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard/productos')
        router.refresh()
      }, 1500)
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('La solicitud tardó demasiado. Verifica tu conexión e intenta de nuevo.')
      } else {
        setError(err.message || 'Error al actualizar el producto.')
      }
    } finally {
      setSaving(false)
    }
  }

  if (loadingData) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="py-20 flex flex-col items-center gap-4 text-center">
        <AlertTriangle className="w-10 h-10 text-red-500" />
        <p className="text-red-300">{loadError}</p>
        <Link href="/dashboard/productos" className="text-primary text-xs font-condensed tracking-widest">
          VOLVER AL INVENTARIO
        </Link>
      </div>
    )
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
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="border-b border-white/5 pb-4 mb-6">
          <h2 className="text-xl font-serif font-bold text-white tracking-wide">Editar Producto</h2>
          <p className="text-xs text-white/40 mt-1">
            Modificá los detalles del producto. Los cambios se reflejan de inmediato en el catálogo.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-3 bg-red-950/40 border border-red-500/20 text-red-200 p-4 rounded-xl text-sm mb-6">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-3 bg-emerald-950/40 border border-emerald-500/20 text-emerald-200 p-4 rounded-xl text-sm mb-6">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">¡Producto Actualizado!</p>
              <p className="text-xs text-emerald-300 mt-0.5">Cambios guardados. Redirigiendo...</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-6">

              {/* Name & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    disabled={saving || success}
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white disabled:opacity-50 font-condensed tracking-wider"
                  />
                </div>

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
                    disabled={saving || success}
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white font-mono disabled:opacity-50"
                  />
                </div>
              </div>

              {/* ABV */}
              <div className="space-y-2">
                <label htmlFor="abv" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                  GRADUACIÓN ALCOHÓLICA (ABV)
                </label>
                <input
                  id="abv"
                  type="text"
                  placeholder="ej. 43%"
                  value={abv}
                  onChange={(e) => setAbv(e.target.value)}
                  disabled={saving || success}
                  className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white disabled:opacity-50 font-condensed tracking-wider"
                />
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-6">
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
                    disabled={saving || success}
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="stock" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                    STOCK *
                  </label>
                  <input
                    id="stock"
                    type="number"
                    required
                    placeholder="ej. 50"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    disabled={saving || success}
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Category & Exclusivity */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="category" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                    CATEGORÍA *
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={saving || success}
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

                <div className="space-y-2">
                  <label className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                    EXCLUSIVIDAD
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsExclusive(!isExclusive)}
                    disabled={saving || success}
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

              {/* Short Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                  DESCRIPCIÓN CORTA
                </label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Descripción breve para cards y listados..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={saving || success}
                  className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white leading-relaxed resize-none disabled:opacity-50"
                />
              </div>

              {/* Long Description */}
              <div className="space-y-2">
                <label htmlFor="longDescription" className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                  DESCRIPCIÓN LARGA (página de producto)
                </label>
                <textarea
                  id="longDescription"
                  rows={6}
                  placeholder="Describe detalladamente el perfil aromático, botánicos utilizados, notas de cata y maridaje..."
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  disabled={saving || success}
                  className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white leading-relaxed resize-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Image Preview Column */}
            <div className="lg:col-span-1 space-y-4 flex flex-col h-full justify-between">
              <div className="space-y-2">
                <label className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                  IMAGEN
                </label>

                <div className="bg-[#141413]/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center gap-4 relative overflow-hidden shadow-inner min-h-[380px] justify-between">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                  <div className="w-full aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center relative group shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
                    {imageUrl ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageUrl}
                          alt="Vista previa"
                          className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                          <span className="text-[9px] tracking-widest font-condensed text-primary uppercase font-bold">VISTA PREVIA</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-white/20">
                        <ImageIcon className="w-10 h-10 stroke-[1.2]" />
                        <span className="text-[10px] uppercase font-condensed tracking-widest font-bold">SIN FOTO</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setImageModalOpen(true)
                      if (availableImages.length === 0) {
                        setImagesLoading(true)
                        fetch('/api/dashboard/product-images')
                          .then((r) => r.json())
                          .then(({ images }) => setAvailableImages(images || []))
                          .finally(() => setImagesLoading(false))
                      }
                    }}
                    disabled={saving || success}
                    className="w-full py-3.5 bg-black/60 hover:bg-black/90 border border-white/10 hover:border-primary/50 text-white/80 hover:text-white rounded-xl text-xs font-condensed tracking-[0.2em] font-bold uppercase transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(197,160,89,0.15)] mt-auto"
                  >
                    {imageUrl ? 'Cambiar Foto' : 'Seleccionar Foto'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6 border-t border-white/5 flex justify-end">
            <button
              type="submit"
              disabled={saving || success}
              className="px-8 py-4 bg-primary text-black font-bold text-xs tracking-[0.25em] uppercase rounded-xl hover:bg-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(197,160,89,0.2)]"
            >
              {saving ? (
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  GUARDAR CAMBIOS
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
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-white tracking-wide">Seleccionar Imagen</h3>
                <p className="text-xs text-white/40 mt-1">Elige una de las imágenes disponibles en el servidor.</p>
              </div>
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="text-white/40 hover:text-white text-xs font-condensed tracking-wider font-bold border border-white/10 hover:border-white/20 rounded-lg px-3 py-1.5 transition-colors uppercase cursor-pointer"
              >
                Cerrar
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {imagesLoading && (
                <div className="flex items-center justify-center py-16">
                  <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {availableImages.map((imgName) => {
                  const fullUrl = `/images/productos/${imgName}`
                  const isSelected = imageUrl === fullUrl
                  return (
                    <button
                      key={imgName}
                      type="button"
                      onClick={() => { setImageUrl(fullUrl); setImageModalOpen(false) }}
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
                      <span className="text-[9px] font-mono tracking-tighter text-white/40 truncate w-full text-center mt-2 group-hover:text-white/70 transition-colors">
                        {imgName.replace('generated-', '').replace('.png', '')}
                      </span>
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

            <div className="p-4 bg-black/20 border-t border-white/5 flex justify-between items-center text-xs text-white/30">
              <span>Total: {availableImages.length} imágenes</span>
              <span className="italic font-condensed tracking-wider">DELIRIO GIN PREMIUM</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

