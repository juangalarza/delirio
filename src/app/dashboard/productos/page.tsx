'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Tag, RefreshCw, AlertTriangle, Trash2, Edit } from 'lucide-react'

export default function ProductosPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/dashboard/products')
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Error al cargar productos')
      }
      const { data } = await res.json()
      setProducts(data || [])
    } catch (err: any) {
      setError(err.message || 'No se pudo cargar el catálogo de productos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto permanentemente?')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/dashboard/products/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || 'Error al eliminar')
      }

      setProducts(products.filter(p => p.id !== id))
    } catch (err: any) {
      alert(err.message || 'Error al eliminar el producto.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6 pt-4">
      {/* Products Inventory Card Panel */}
      <div className="bg-[#0F0F0E] border border-white/5 rounded-2xl p-6 flex flex-col justify-between shadow-md">
        
        {/* Panel Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-white/5 pb-5 mb-5 gap-4">
          <div>
            <h2 className="text-xl font-serif font-bold text-white tracking-wide">Inventario de Productos</h2>
            <p className="text-xs text-white/40 mt-1">
              Administración y control de botellas de gin, lotes especiales y mercadería del e-commerce.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Refresh Button */}
            <button
              onClick={fetchProducts}
              disabled={loading}
              className="p-2.5 bg-[#141413] border border-white/5 hover:border-primary/20 text-white/60 hover:text-primary rounded-xl transition-all cursor-pointer disabled:opacity-50"
              title="Actualizar Catálogo"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            {/* Create Product Button */}
            <Link
              href="/dashboard/productos/nuevo"
              className="px-5 py-3 bg-primary text-black font-bold text-xs tracking-[0.15em] uppercase rounded-xl hover:bg-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(197,160,89,0.2)]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              NUEVO PRODUCTO
            </Link>
          </div>
        </div>

        {/* Loading Spinner Skeleton */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            <p className="text-xs text-white/40 font-condensed tracking-widest animate-pulse">CARGANDO CATÁLOGO...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="py-12 px-6 flex flex-col items-center justify-center text-center gap-4 border border-red-500/10 bg-red-950/5 rounded-xl max-w-2xl mx-auto my-6">
            <AlertTriangle className="w-10 h-10 text-red-500" />
            <div>
              <p className="font-bold text-red-200">Error de Conexión</p>
              <p className="text-xs text-red-300/70 mt-1 max-w-md leading-relaxed">{error}</p>
            </div>
            <button
              onClick={fetchProducts}
              className="mt-2 px-4 py-2 border border-red-500/20 hover:border-red-500/40 text-red-300 hover:text-white rounded-lg text-xs font-condensed font-bold tracking-widest transition-colors cursor-pointer"
            >
              REINTENTAR CONEXIÓN
            </button>
          </div>
        )}

        {/* Empty Catalog State */}
        {!loading && !error && products.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-4 border border-dashed border-white/5 bg-white/[0.01] rounded-xl my-4">
            <Tag className="w-12 h-12 text-white/20" />
            <div>
              <p className="font-serif font-bold text-white/80 text-lg">Catálogo Vacío</p>
              <p className="text-xs text-white/40 mt-1 max-w-sm leading-relaxed">
                No hay productos cargados en tu base de datos de Supabase. Añade tu primer producto haciendo clic en el botón superior.
              </p>
            </div>
            <Link
              href="/dashboard/productos/nuevo"
              className="mt-3 px-5 py-2.5 bg-primary/10 border border-primary/20 hover:border-primary text-primary hover:text-black rounded-xl text-xs font-condensed font-bold tracking-widest transition-all cursor-pointer"
            >
              AGREGAR MI PRIMER PRODUCTO
            </Link>
          </div>
        )}

        {/* Products Table */}
        {!loading && !error && products.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-3 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">PRODUCTO</th>
                  <th className="py-3 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">CATEGORÍA</th>
                  <th className="py-3 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">PRECIO</th>
                  <th className="py-3 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">STOCK</th>
                  <th className="py-3 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">EXCLUSIVIDAD</th>
                  <th className="py-3 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase text-right">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.01] transition-colors group">
                    
                    {/* Column 1: Image & Name */}
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative bg-black/50 border border-white/5 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                          <Image
                            src={product.image_url || '/images/generated-1778549037715.png'}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-serif font-bold text-white group-hover:text-primary transition-colors truncate">
                            {product.name}
                          </span>
                          <span className="text-[10px] text-white/40 mt-0.5 font-condensed tracking-wider truncate">
                            /{product.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Category */}
                    <td className="py-4 text-xs font-condensed font-medium text-white/60">
                      {product.category || 'Sin Categoría'}
                    </td>

                    {/* Column 3: Price */}
                    <td className="py-4 font-condensed text-sm font-bold text-white/90">
                      ${Number(product.price).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>

                    {/* Column 4: Stock */}
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-400' : product.stock > 0 ? 'bg-amber-400' : 'bg-red-400'}`} />
                        <span className="font-condensed text-sm text-white/80">{product.stock} unidades</span>
                      </div>
                    </td>

                    {/* Column 5: Exclusivity */}
                    <td className="py-4">
                      {product.is_exclusive ? (
                        <span className="px-2 py-0.5 text-[8px] font-condensed font-bold tracking-widest uppercase bg-primary/10 text-primary border border-primary/20 rounded-sm">
                          EXCLUSIVO SOCIO
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[8px] font-condensed font-bold tracking-widest uppercase bg-white/5 text-white/40 border border-white/5 rounded-sm">
                          REGULAR
                        </span>
                      )}
                    </td>

                    {/* Column 6: Action Buttons */}
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit Item */}
                        <Link
                          href={`/dashboard/productos/${product.id}/editar`}
                          className="p-2 border border-white/5 bg-[#141413] hover:border-primary/20 text-white/40 hover:text-primary rounded-xl transition-all cursor-pointer"
                          title="Editar Producto"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        
                        {/* Delete Item */}
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          className="p-2 border border-white/5 bg-[#141413] hover:border-red-500/20 text-white/40 hover:text-red-400 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                          title="Eliminar Producto"
                        >
                          {deletingId === product.id ? (
                            <div className="w-3.5 h-3.5 rounded-full border border-red-500 border-t-transparent animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  )
}
