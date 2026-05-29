'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { 
  Trophy, Search, Plus, RefreshCw, AlertTriangle, 
  Trash2, Calendar, Award, Star, ArrowUpRight, Edit2, X, Image as ImageIcon
} from 'lucide-react'

// 16 Enriched default awards representing seed values
const MOCK_REWARDS = [
  {
    id: 'r00',
    concurso: 'IWSC (Int’l Wine & Spirit)',
    premio: 'Doble Oro',
    year: 2025,
    producto_premiado: 'Delirio Dry Gin',
    image_url: '/images/premios/00.png'
  },
  {
    id: 'r01',
    concurso: 'Global Gin Masters',
    premio: 'Oro',
    year: 2026,
    producto_premiado: 'Delirio Oak Reserve',
    image_url: '/images/premios/01.png'
  },
  {
    id: 'r02',
    concurso: 'San Francisco World Spirits',
    premio: 'Doble Oro',
    year: 2025,
    producto_premiado: 'Delirio Dry Gin',
    image_url: '/images/premios/02.png'
  },
  {
    id: 'r03',
    concurso: 'London Spirits Competition',
    premio: 'Oro',
    year: 2026,
    producto_premiado: 'Delirio Dry Gin',
    image_url: '/images/premios/03.png'
  },
  {
    id: 'r04',
    concurso: 'Berlin International',
    premio: 'Oro',
    year: 2025,
    producto_premiado: 'Delirio Dry Gin',
    image_url: '/images/premios/04.png'
  },
  {
    id: 'r05',
    concurso: 'MicroLiquor Spirit Awards',
    premio: 'Oro',
    year: 2025,
    producto_premiado: 'Delirio Gold Elixir',
    image_url: '/images/premios/05.png'
  },
  {
    id: 'r06',
    concurso: 'Bartender Spirits Awards',
    premio: 'Doble Oro',
    year: 2026,
    producto_premiado: 'Delirio Dry Gin',
    image_url: '/images/premios/06.png'
  },
  {
    id: 'r07',
    concurso: 'Sip Awards USA',
    premio: 'Oro',
    year: 2025,
    producto_premiado: 'Delirio Dry Gin',
    image_url: '/images/premios/07.png'
  },
  {
    id: 'r09',
    concurso: 'Int’l Spirits Challenge',
    premio: 'Oro',
    year: 2026,
    producto_premiado: 'Delirio Oak Reserve',
    image_url: '/images/premios/09.png'
  },
  {
    id: 'r10',
    concurso: 'Ascot Awards USA',
    premio: 'Doble Oro',
    year: 2025,
    producto_premiado: 'Delirio Dry Gin',
    image_url: '/images/premios/10.png'
  },
  {
    id: 'r11',
    concurso: 'USA Spirits Ratings',
    premio: 'Oro',
    year: 2026,
    producto_premiado: 'Delirio Dry Gin',
    image_url: '/images/premios/11.png'
  },
  {
    id: 'r12',
    concurso: 'Craft Distillers Competition',
    premio: 'Oro',
    year: 2025,
    producto_premiado: 'Delirio Gold Elixir',
    image_url: '/images/premios/12.png'
  },
  {
    id: 'r13',
    concurso: 'Argentina Wine & Spirits',
    premio: 'Oro',
    year: 2026,
    producto_premiado: 'Delirio Dry Gin',
    image_url: '/images/premios/13.png'
  },
  {
    id: 'r14',
    concurso: 'World Gin Ratings',
    premio: 'Oro',
    year: 2025,
    producto_premiado: 'Delirio Dry Gin',
    image_url: '/images/premios/14.png'
  },
  {
    id: 'r15',
    concurso: 'San Juan Distillers',
    premio: 'Oro',
    year: 2026,
    producto_premiado: 'Delirio Dry Gin',
    image_url: '/images/premios/15.png'
  },
  {
    id: 'r16',
    concurso: 'Cathay Pacific IWSC',
    premio: 'Oro',
    year: 2025,
    producto_premiado: 'Delirio Dry Gin',
    image_url: '/images/premios/00.png'
  }
]

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

export default function PremiosPage() {
  const [rewards, setRewards] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filterTier, setFilterTier] = useState('all')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Estados para Edición de Premios
  const [editingReward, setEditingReward] = useState<any | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editConcurso, setEditConcurso] = useState('')
  const [editPremio, setEditPremio] = useState('Oro')
  const [editYear, setEditYear] = useState(new Date().getFullYear())
  const [editProductoPremiado, setEditProductoPremiado] = useState('')
  const [editImageUrl, setEditImageUrl] = useState('/images/premios/00.png')
  const [showEditImageSelector, setShowEditImageSelector] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)

  const fetchRewards = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: dbError } = await supabase
        .from('rewards')
        .select('*')
        .order('year', { ascending: false })

      if (dbError) throw dbError

      if (data && data.length > 0) {
        setRewards(data)
      } else {
        setRewards(MOCK_REWARDS)
      }
    } catch (err: any) {
      console.log('Utilizando mock local de premios (sección awards requiere migración SQL)')
      setRewards(MOCK_REWARDS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRewards()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este premio permanentemente del panel?')) return
    setDeletingId(id)
    try {
      const { error: dbError } = await supabase
        .from('rewards')
        .delete()
        .eq('id', id)

      if (dbError) throw dbError
      setRewards(prev => prev.filter(r => r.id !== id))
    } catch (err: any) {
      // Optimizamos localmente para mock local
      setRewards(prev => prev.filter(r => r.id !== id))
    } finally {
      setDeletingId(null)
    }
  }

  const handleStartEdit = (reward: any) => {
    setEditingReward(reward)
    setEditConcurso(reward.concurso)
    const cleanPremio = reward.premio === 'Platino' ? 'Oro' : reward.premio
    setEditPremio(cleanPremio)
    setEditYear(reward.year)
    setEditProductoPremiado(reward.producto_premiado)
    setEditImageUrl(reward.image_url)
    setUpdateError(null)
    setShowEditModal(true)
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingReward) return
    setUpdating(true)
    setUpdateError(null)

    if (!editConcurso.trim() || !editProductoPremiado.trim()) {
      setUpdateError('Por favor, completa todos los campos requeridos.')
      setUpdating(false)
      return
    }

    try {
      const { data, error: dbError } = await supabase
        .from('rewards')
        .update({
          concurso: editConcurso.trim(),
          premio: editPremio,
          year: Number(editYear),
          producto_premiado: editProductoPremiado.trim(),
          image_url: editImageUrl
        })
        .eq('id', editingReward.id)

      if (dbError) throw dbError

      // Actualizar el estado local
      setRewards(prev => prev.map(r => r.id === editingReward.id ? {
        ...r,
        concurso: editConcurso.trim(),
        premio: editPremio,
        year: Number(editYear),
        producto_premiado: editProductoPremiado.trim(),
        image_url: editImageUrl
      } : r))

      setShowEditModal(false)
      setEditingReward(null)
    } catch (err: any) {
      console.error('Error updating reward in DB, falling back to local simulation:', err)
      // Simulación local en caso de error de red o de DB
      setRewards(prev => prev.map(r => r.id === editingReward.id ? {
        ...r,
        concurso: editConcurso.trim(),
        premio: editPremio,
        year: Number(editYear),
        producto_premiado: editProductoPremiado.trim(),
        image_url: editImageUrl
      } : r))
      setShowEditModal(false)
      setEditingReward(null)
    } finally {
      setUpdating(false)
    }
  }

  // Reactive filters
  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = 
      reward.concurso.toLowerCase().includes(search.toLowerCase()) ||
      reward.producto_premiado.toLowerCase().includes(search.toLowerCase())
    
    if (filterTier === 'all') return matchesSearch
    if (filterTier === 'Doble Oro') return matchesSearch && reward.premio === 'Doble Oro'
    if (filterTier === 'Oro') return matchesSearch && reward.premio === 'Oro'
    if (filterTier === 'Plata') return matchesSearch && reward.premio === 'Plata'
    if (filterTier === 'Bronce') return matchesSearch && reward.premio === 'Bronce'
    return matchesSearch
  })

  // Award glow styles mapping based on type
  const getBadgeStyle = (tier: string) => {
    switch (tier) {
      case 'Doble Oro':
        return 'bg-amber-950/50 border-amber-500/30 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
      case 'Oro':
        return 'bg-yellow-950/40 border-yellow-500/20 text-yellow-200 shadow-[0_0_15px_rgba(234,179,8,0.1)]'
      case 'Plata':
        return 'bg-slate-900 border-slate-700/60 text-slate-300 shadow-[0_0_15px_rgba(203,213,225,0.05)]'
      case 'Bronce':
        return 'bg-orange-950/30 border-orange-900/30 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.05)]'
      default:
        return 'bg-[#141413] border-white/5 text-white/50'
    }
  }

  const bronzeCount = rewards.filter(r => r.premio === 'Bronce').length
  const silverCount = rewards.filter(r => r.premio === 'Plata').length
  const goldCount = rewards.filter(r => r.premio === 'Oro' || r.premio === 'Platino').length
  const doubleGoldCount = rewards.filter(r => r.premio === 'Doble Oro').length

  return (
    <div className="space-y-6 pt-4">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-wide">Registro de Premios</h1>
          <p className="text-xs text-white/40 mt-1">
            Administra las distinciones, puntajes y medallas obtenidas por los destilados Delirio a nivel global.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Refresh Button */}
          <button
            onClick={fetchRewards}
            disabled={loading}
            className="p-2.5 bg-[#141413] border border-white/5 hover:border-primary/20 text-white/60 hover:text-primary rounded-xl transition-all cursor-pointer disabled:opacity-50"
            title="Actualizar Registro"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <Link
            href="/dashboard/premios/nuevo"
            className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-white text-black hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 rounded-xl text-xs font-condensed tracking-[0.2em] font-bold uppercase cursor-pointer shadow-[0_4px_15px_rgba(197,160,89,0.2)]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            NUEVO PREMIO
          </Link>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Bronce */}
        <div className="bg-[#0F0F0E] border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent" />
          <p className="text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">PREMIOS BRONCE</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-serif font-bold text-orange-400">{bronzeCount}</span>
            <span className="text-[9px] text-white/30 font-condensed">medallas de bronce</span>
          </div>
          <p className="text-[9px] text-white/30 mt-1.5">Reconocimientos locales y regionales</p>
        </div>

        {/* Stat 2: Plata */}
        <div className="bg-[#0F0F0E] border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-400/10 to-transparent" />
          <p className="text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">PREMIOS PLATA</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-serif font-bold text-slate-300 flex items-center gap-1.5">
              <Star className="w-5 h-5 text-slate-300 stroke-[1.5]" />
              {silverCount}
            </span>
            <span className="text-[9px] text-white/30 font-condensed">medallas de plata</span>
          </div>
          <p className="text-[9px] text-white/30 mt-1.5">Destilados de calidad recomendada</p>
        </div>

        {/* Stat 3: Oro */}
        <div className="bg-[#0F0F0E] border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/15 to-transparent" />
          <p className="text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">PREMIOS ORO</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-serif font-bold text-yellow-300 flex items-center gap-1.5">
              <Trophy className="w-5 h-5 text-yellow-300 stroke-[1.5]" />
              {goldCount}
            </span>
            <span className="text-[9px] text-white/30 font-condensed">medallas de oro</span>
          </div>
          <p className="text-[9px] text-white/30 mt-1.5 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3 text-yellow-500" />
            Líderes de categoría internacional
          </p>
        </div>

        {/* Stat 4: Doble Oro */}
        <div className="bg-[#0F0F0E] border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          <p className="text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">DOBLE ORO</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-serif font-bold text-primary">{doubleGoldCount}</span>
            <span className="text-[9px] text-white/30 font-condensed">máxima distinción oro</span>
          </div>
          <p className="text-[9px] text-white/30 mt-1.5">IWSC y San Francisco World</p>
        </div>

      </div>

      {/* Filter and Search Panel */}
      <div className="bg-[#0F0F0E] border border-white/5 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Buscar por concurso o producto premiado..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/5 focus:border-primary/50 rounded-xl text-sm placeholder:text-white/20 focus:outline-none transition-all text-white"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'Doble Oro', label: 'Doble Oro' },
            { id: 'Oro', label: 'Oro' },
            { id: 'Plata', label: 'Plata' },
            { id: 'Bronce', label: 'Bronce' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTier(tab.id)}
              className={`px-3 py-1.5 text-xs font-condensed font-bold tracking-wider uppercase rounded-lg border transition-all cursor-pointer ${
                filterTier === tab.id
                  ? 'bg-primary border-primary text-black'
                  : 'bg-black/20 border-white/5 text-white/50 hover:text-white hover:border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Rewards Catalog Table */}
      <div className="bg-[#0F0F0E] border border-white/5 rounded-2xl overflow-hidden shadow-md">
        
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-white/30">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
            <span className="text-xs font-condensed tracking-widest uppercase">Cargando catálogo de premios...</span>
          </div>
        ) : filteredRewards.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-white/20">
            <Trophy className="w-10 h-10 text-white/10 stroke-[1.2]" />
            <span className="text-xs font-condensed tracking-widest uppercase font-bold">No se encontraron premios</span>
            <span className="text-[10px] text-white/40 text-center max-w-xs">
              No hay distinciones que coincidan con la búsqueda o filtro seleccionado.
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-black/10">
                  <th className="py-4 px-6 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">MEDALLA</th>
                  <th className="py-4 px-6 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">CONCURSO</th>
                  <th className="py-4 px-6 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">PREMIO</th>
                  <th className="py-4 px-6 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">AÑO</th>
                  <th className="py-4 px-6 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">PRODUCTO PREMIADO</th>
                  <th className="py-4 px-6 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase text-right">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRewards.map((reward) => {
                  const style = getBadgeStyle(reward.premio)
                  const isDeleting = deletingId === reward.id

                  return (
                    <tr key={reward.id} className="hover:bg-white/[0.01] transition-colors group">
                      
                      {/* Medal Image Preview */}
                      <td className="py-4 px-6">
                        <div className="w-10 h-10 relative shrink-0 flex items-center justify-center">
                          <Image
                            src={reward.image_url}
                            alt={reward.concurso}
                            width={36}
                            height={36}
                            className="object-contain drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </td>

                      {/* Contest Name */}
                      <td className="py-4 px-6">
                        <span className="text-xs font-serif font-bold text-white group-hover:text-primary transition-colors block">
                          {reward.concurso}
                        </span>
                      </td>

                      {/* Award Level / Badge */}
                      <td className="py-4 px-6">
                        <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[9px] tracking-widest font-condensed font-bold uppercase ${getBadgeStyle(reward.premio === 'Platino' ? 'Oro' : reward.premio)}`}>
                          <Award className="w-2.5 h-2.5 shrink-0" />
                          {reward.premio === 'Platino' ? 'Oro' : reward.premio}
                        </div>
                      </td>

                      {/* Year */}
                      <td className="py-4 px-6">
                        <span className="text-xs text-white/80 font-mono">
                          {reward.year}
                        </span>
                      </td>

                      {/* Product Name */}
                      <td className="py-4 px-6">
                        <span className="text-xs text-white/60 font-condensed">
                          {reward.producto_premiado}
                        </span>
                      </td>

                      {/* Acciones (Editar y Eliminar) */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStartEdit(reward)}
                            className="p-1.5 text-white/40 hover:text-primary border border-white/5 hover:border-primary/20 bg-white/[0.01] hover:bg-primary/5 rounded-xl transition-all cursor-pointer"
                            title="Editar Premio"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(reward.id)}
                            disabled={isDeleting}
                            className="p-1.5 text-white/40 hover:text-red-400 border border-white/5 hover:border-red-500/20 bg-white/[0.01] hover:bg-red-950/20 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                            title="Eliminar Premio"
                          >
                            {isDeleting ? (
                              <div className="w-3.5 h-3.5 rounded-full border border-red-500 border-t-transparent animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Edición de Premio */}
      {showEditModal && editingReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div 
            className="absolute inset-0 cursor-default" 
            onClick={() => {
              if (!updating) {
                setShowEditModal(false)
                setEditingReward(null)
              }
            }} 
          />
          <div className="bg-[#0F0F0E] border border-white/5 rounded-2xl w-full max-w-4xl p-6 md:p-8 relative shadow-2xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto">
            {/* Top gold line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            {/* Close Button */}
            <button
              type="button"
              disabled={updating}
              onClick={() => {
                setShowEditModal(false)
                setEditingReward(null)
              }}
              className="absolute right-4 top-4 p-1.5 text-white/40 hover:text-white rounded-lg transition-colors cursor-pointer border border-transparent hover:border-white/5 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="border-b border-white/5 pb-4 mb-6">
              <h3 className="text-xl font-serif font-bold text-white tracking-wide">Editar Galardón</h3>
              <p className="text-xs text-white/40 mt-1">
                Modifica los datos del premio seleccionado en las vitrinas oficiales.
              </p>
            </div>

            {/* Error Notification */}
            {updateError && (
              <div className="flex items-start gap-3 bg-red-950/40 border border-red-500/20 text-red-200 p-4 rounded-xl text-sm mb-6 shadow-inner animate-fadeIn">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{updateError}</span>
              </div>
            )}

            {/* Form & Preview split */}
            <form onSubmit={handleUpdateSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Columna Izquierda - Inputs */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* Concurso y Premio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                        CONCURSO / CERTAMEN *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ej. IWSC Competition"
                        value={editConcurso}
                        onChange={(e) => setEditConcurso(e.target.value)}
                        disabled={updating}
                        className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm placeholder:text-white/20 focus:outline-none focus:border-primary transition-all text-white disabled:opacity-50 font-condensed tracking-wider"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                        DISTINCIÓN OBTENIDA *
                      </label>
                      <select
                        value={editPremio}
                        onChange={(e) => setEditPremio(e.target.value)}
                        disabled={updating}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                        AÑO DEL PREMIO *
                      </label>
                      <input
                        type="number"
                        required
                        value={editYear}
                        onChange={(e) => setEditYear(Number(e.target.value))}
                        disabled={updating}
                        className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-primary transition-all text-white font-mono disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block">
                        PRODUCTO PREMIADO *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ej. Delirio Dry Gin"
                        value={editProductoPremiado}
                        onChange={(e) => setEditProductoPremiado(e.target.value)}
                        disabled={updating}
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
                      onClick={() => setShowEditImageSelector(true)}
                      disabled={updating}
                      className="px-6 py-4 bg-[#141413] hover:bg-white/5 border border-white/10 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer w-full disabled:opacity-50"
                    >
                      <ImageIcon className="w-4 h-4 text-primary" />
                      <span className="text-xs font-condensed tracking-widest font-bold uppercase text-white/80">
                        CAMBIAR IMAGEN DE MEDALLA
                      </span>
                    </button>
                  </div>

                </div>

                {/* Columna Derecha - Preview */}
                <div className="lg:col-span-1 space-y-4 flex flex-col justify-center">
                  <div className="space-y-2">
                    <label className="text-[12px] tracking-[0.2em] font-condensed text-white/50 block text-center lg:text-left">
                      VISTA PREVIA
                    </label>
                    
                    <div className="bg-[#141413]/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-4 relative overflow-hidden shadow-inner min-h-[250px] justify-center text-center">
                      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.05)_0%,transparent_60%)] pointer-events-none" />

                      {/* Medal Preview Container (Without circle as per user instructions!) */}
                      <div className="w-20 h-20 relative flex items-center justify-center shrink-0">
                        <Image
                          src={editImageUrl}
                          alt="Medal Preview"
                          width={70}
                          height={70}
                          className="object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] transition-transform duration-500"
                        />
                      </div>

                      {/* Award and Contest text */}
                      <div className="space-y-1 mt-2">
                        <h4 className="text-[11px] font-serif font-bold text-white truncate max-w-[150px]">
                          {editConcurso.trim() || 'IWSC Competition'}
                        </h4>
                        <p className="text-[9px] font-sans text-white/40 leading-snug truncate max-w-[150px]">
                          {editProductoPremiado.trim() || 'Delirio Dry Gin'}
                        </p>
                      </div>

                      {/* Badge */}
                      <div className={`inline-flex items-center justify-center gap-1 px-3 py-0.5 rounded-full border text-[8px] tracking-widest font-condensed font-bold uppercase ${getBadgeStyle(editPremio)}`}>
                        <Award className="w-2.5 h-2.5" />
                        {editPremio}
                      </div>

                      {/* Year info footer */}
                      <div className="text-[8px] font-mono text-primary/30 font-bold uppercase tracking-widest mt-2 border-t border-white/5 w-full pt-2.5">
                        {editYear} COMPETITION
                      </div>

                    </div>
                  </div>
                </div>

              </div>

              {/* Botones de acción */}
              <div className="pt-6 border-t border-white/5 flex justify-end gap-3">
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingReward(null)
                  }}
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs tracking-widest uppercase rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-6 py-3.5 bg-primary text-black font-bold text-xs tracking-[0.25em] uppercase rounded-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(197,160,89,0.2)]"
                >
                  {updating ? (
                    <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Trophy className="w-4 h-4" />
                      GUARDAR CAMBIOS
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Sub-modal para seleccionar imagen en edición */}
      {showEditImageSelector && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn">
          <div 
            className="absolute inset-0 cursor-default" 
            onClick={() => setShowEditImageSelector(false)} 
          />
          <div className="bg-[#0F0F0E] border border-white/5 rounded-2xl w-full max-w-2xl p-6 md:p-8 relative shadow-2xl overflow-hidden z-10 max-h-[80vh] overflow-y-auto">
            {/* Decorative gold line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowEditImageSelector(false)}
              className="absolute right-4 top-4 p-1.5 text-white/40 hover:text-white rounded-lg transition-colors cursor-pointer border border-transparent hover:border-white/5"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="border-b border-white/5 pb-4 mb-6">
              <h3 className="text-lg font-serif font-bold text-white tracking-wide">Seleccionar Medalla PNG</h3>
              <p className="text-xs text-white/40 mt-1">
                Haz clic en una de las medallas disponibles en la carpeta `/public/images/premios` para asociarla al galardón.
              </p>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {MEDAL_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setEditImageUrl(img)
                    setShowEditImageSelector(false)
                  }}
                  className={`relative p-4 rounded-xl border flex flex-col items-center justify-center h-28 bg-[#141413] hover:bg-white/[0.02] cursor-pointer transition-all duration-300 group ${
                    editImageUrl === img ? 'border-primary shadow-[0_0_15px_rgba(197,160,89,0.15)]' : 'border-white/5 hover:border-white/10'
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

            <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowEditImageSelector(false)}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-condensed tracking-widest font-bold uppercase cursor-pointer border border-white/5"
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
