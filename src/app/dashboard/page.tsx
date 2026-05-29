'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  TrendingUp, Users, Wine, Package, Clock,
  MoreVertical, Check, ChevronRight, RefreshCw
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  // Mock production batch project data (comparable to "Projects" in reference image)
  const productionBatches = [
    {
      id: 'batch-1',
      name: 'Delirio Oak Reserve #102',
      category: 'Edición Barrica Limitada',
      budget: '$58.000',
      completion: 60,
      status: 'Añejamiento',
      members: ['J', 'A', 'M', 'G']
    },
    {
      id: 'batch-2',
      name: 'Delirio Gold Elixir #84',
      category: 'Destilación 47% Botánicos',
      budget: '$65.000',
      completion: 100,
      status: 'Completado',
      members: ['M', 'G']
    },
    {
      id: 'batch-3',
      name: 'Pink Blossom Special',
      category: 'Infusión Floral Primavera',
      budget: '$23.800',
      completion: 20,
      status: 'Cosecha de Botánicos',
      members: ['F', 'J', 'S']
    },
    {
      id: 'batch-4',
      name: 'Destilado Base Desierto',
      category: 'Lote de Enebro Orgánico',
      budget: '$120.000',
      completion: 85,
      status: 'Segunda Destilación',
      members: ['A', 'D', 'L', 'S', 'P']
    }
  ]

  // Chronological timeline activity logs (comparable to "Orders overview" in reference image)
  const activityLogs = [
    {
      id: 1,
      title: '$24,000, Pago aprobado MercadoPago',
      time: 'Hoy, 7:20 PM',
      color: 'bg-primary border-primary/20',
      icon: Check
    },
    {
      id: 2,
      title: 'Nuevo pedido premium recibido #1832412',
      time: 'Ayer, 11:00 PM',
      color: 'bg-emerald-500 border-emerald-500/20',
      icon: Package
    },
    {
      id: 3,
      title: 'Añejamiento Batch #102 transferido a Barrica de Roble',
      time: '18 de Mayo, 4:30 PM',
      color: 'bg-amber-500 border-amber-500/20',
      icon: Wine
    },
    {
      id: 4,
      title: 'Registro de nuevo Cliente VIP corporativo aprobado',
      time: '15 de Mayo, 2:15 PM',
      color: 'bg-blue-500 border-blue-500/20',
      icon: Users
    },
    {
      id: 5,
      title: 'Orden de preventa despachada por OCA (San Juan -> Buenos Aires)',
      time: '12 de Mayo, 9:00 AM',
      color: 'bg-purple-500 border-purple-500/20',
      icon: Clock
    }
  ]

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* ROW 1: STAT CARDS (Tarjetas colgantes de estadísticas)         */}
      {/* ------------------------------------------------------------- */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        
        {/* Card 1: Ventas del Mes */}
        <div className="relative bg-[#0F0F0E] border border-white/5 rounded-2xl p-5 pt-8 flex flex-col justify-between shadow-md group hover:border-primary/10 transition-colors duration-500">
          {/* Hanging icon box - GOLD */}
          <div className="absolute -top-4 left-5 w-12 h-12 rounded-xl flex items-center justify-center bg-[#C5A059] text-black shadow-[0_6px_20px_rgba(197,160,89,0.3)] transform group-hover:scale-110 transition-transform duration-300">
            <TrendingUp className="w-5 h-5 text-black" />
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-[0.2em] font-condensed text-white/40 font-bold uppercase">VENTAS DEL MES</p>
            <h4 className="text-2xl font-condensed font-bold text-white mt-1">$281,400</h4>
          </div>
          <div className="border-t border-white/5 my-4" />
          <p className="text-xs text-white/40 flex items-center gap-1">
            <span className="text-emerald-400 font-bold font-condensed flex items-center">+55%</span>
            <span>que el mes pasado</span>
          </p>
        </div>

        {/* Card 2: Socios VIP Activos */}
        <div className="relative bg-[#0F0F0E] border border-white/5 rounded-2xl p-5 pt-8 flex flex-col justify-between shadow-md group hover:border-primary/10 transition-colors duration-500">
          {/* Hanging icon box - CHARCOAL */}
          <div className="absolute -top-4 left-5 w-12 h-12 rounded-xl flex items-center justify-center bg-[#2A2928] text-white shadow-[0_6px_20px_rgba(0,0,0,0.4)] transform group-hover:scale-110 transition-transform duration-300">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-[0.2em] font-condensed text-white/40 font-bold uppercase">SOCIOS VIP</p>
            <h4 className="text-2xl font-condensed font-bold text-white mt-1">2,300</h4>
          </div>
          <div className="border-t border-white/5 my-4" />
          <p className="text-xs text-white/40 flex items-center gap-1">
            <span className="text-emerald-400 font-bold font-condensed flex items-center">+3%</span>
            <span>nuevos socios esta semana</span>
          </p>
        </div>

        {/* Card 3: Litros Destilados */}
        <div className="relative bg-[#0F0F0E] border border-white/5 rounded-2xl p-5 pt-8 flex flex-col justify-between shadow-md group hover:border-primary/10 transition-colors duration-500">
          {/* Hanging icon box - EMERALD */}
          <div className="absolute -top-4 left-5 w-12 h-12 rounded-xl flex items-center justify-center bg-[#0B3A22] text-[#C5A059] shadow-[0_6px_20px_rgba(11,58,34,0.3)] transform group-hover:scale-110 transition-transform duration-300">
            <Wine className="w-5 h-5 text-primary" />
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-[0.2em] font-condensed text-white/40 font-bold uppercase">DESTILADO BASE</p>
            <h4 className="text-2xl font-condensed font-bold text-white mt-1">34k lts</h4>
          </div>
          <div className="border-t border-white/5 my-4" />
          <p className="text-xs text-white/40 flex items-center gap-1">
            <span className="text-emerald-400 font-bold font-condensed flex items-center">+1%</span>
            <span>de rendimiento en alambique</span>
          </p>
        </div>

        {/* Card 4: Pedidos en Espera */}
        <div className="relative bg-[#0F0F0E] border border-white/5 rounded-2xl p-5 pt-8 flex flex-col justify-between shadow-md group hover:border-primary/10 transition-colors duration-500">
          {/* Hanging icon box - BRONZE */}
          <div className="absolute -top-4 left-5 w-12 h-12 rounded-xl flex items-center justify-center bg-[#804E2D] text-white shadow-[0_6px_20px_rgba(128,78,45,0.3)] transform group-hover:scale-110 transition-transform duration-300">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-[0.2em] font-condensed text-white/40 font-bold uppercase">DESPACHOS OCA</p>
            <h4 className="text-2xl font-condensed font-bold text-white mt-1">+91</h4>
          </div>
          <div className="border-t border-white/5 my-4" />
          <p className="text-xs text-white/40 flex items-center gap-1">
            <span className="text-primary font-bold font-condensed flex items-center">Activo</span>
            <span>Envíos despachados hoy</span>
          </p>
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* ROW 2: CHART CARDS (Fila de gráficos SVG dorados y oscuros)   */}
      {/* ------------------------------------------------------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        
        {/* Chart 1: Vistas del Sitio (Bar Chart) */}
        <div className="bg-[#0F0F0E] border border-white/5 rounded-2xl p-5 pt-6 flex flex-col relative group hover:border-primary/10 transition-colors duration-500">
          <div className="w-full h-44 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#E2B765] to-[#99773B] shadow-[0_10px_30px_rgba(197,160,89,0.25)] border border-primary/20">
            <svg className="w-full h-full p-4 overflow-visible" viewBox="0 0 300 120">
              {[0, 30, 60, 90].map((y) => (
                <line key={y} x1="10" y1={y} x2="290" y2={y} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="3" />
              ))}
              {[
                { x: 30, h: 70, label: 'L' },
                { x: 65, h: 40, label: 'M' },
                { x: 100, h: 30, label: 'M' },
                { x: 135, h: 50, label: 'J' },
                { x: 170, h: 90, label: 'V' },
                { x: 205, h: 35, label: 'S' },
                { x: 240, h: 75, label: 'D' },
              ].map((bar, i) => (
                <g key={i}>
                  <rect x={bar.x - 4} y={100 - bar.h} width="8" height={bar.h} rx="2" fill="rgba(255,255,255,0.2)" className="blur-xs" />
                  <rect x={bar.x - 4} y={100 - bar.h} width="8" height={bar.h} rx="2" fill="#FFFFFF" />
                  <text x={bar.x} y="115" fill="rgba(255,255,255,0.7)" fontSize="9" textAnchor="middle" className="font-condensed font-bold">{bar.label}</text>
                </g>
              ))}
            </svg>
          </div>
          
          <h3 className="text-base font-serif font-bold text-white">Vistas de Socios</h3>
          <p className="text-xs text-white/50 mt-1 leading-relaxed">
            Tráfico en catálogo exclusivo de botánicos y reservas.
          </p>
          <div className="border-t border-white/5 my-4" />
          <p className="text-[10px] text-white/40 flex items-center gap-1.5 font-condensed">
            <Clock className="w-3.5 h-3.5 text-primary" />
            ACTUALIZADO HACE 2 DÍAS
          </p>
        </div>

        {/* Chart 2: Ventas Diarias (Smooth Line Chart) */}
        <div className="bg-[#0F0F0E] border border-white/5 rounded-2xl p-5 pt-6 flex flex-col relative group hover:border-primary/10 transition-colors duration-500">
          <div className="w-full h-44 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#1F1E1E] to-[#121111] border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <svg className="w-full h-full p-4 overflow-visible" viewBox="0 0 300 120">
              {[0, 30, 60, 90].map((y) => (
                <line key={y} x1="15" y1={y} x2="285" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="3" />
              ))}
              <path
                d="M 20 80 Q 55 85 90 40 T 160 50 T 230 20 T 280 15"
                fill="none"
                stroke="#C5A059"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 20 80 Q 55 85 90 40 T 160 50 T 230 20 T 280 15"
                fill="none"
                stroke="#C5A059"
                strokeWidth="6"
                strokeLinecap="round"
                className="opacity-30 blur-xs"
              />
              {[
                { cx: 20, cy: 80 },
                { cx: 90, cy: 40 },
                { cx: 160, cy: 50 },
                { cx: 230, cy: 20 },
                { cx: 280, cy: 15 }
              ].map((dot, i) => (
                <g key={i}>
                  <circle cx={dot.cx} cy={dot.cy} r="4" fill="#C5A059" />
                  <circle cx={dot.cx} cy={dot.cy} r="7" fill="rgba(197,160,89,0.3)" className="animate-pulse" />
                </g>
              ))}
              {[
                { x: 20, l: 'Abr' },
                { x: 90, l: 'Jun' },
                { x: 160, l: 'Ago' },
                { x: 230, l: 'Oct' },
                { x: 280, l: 'Dic' }
              ].map((lbl, i) => (
                <text key={i} x={lbl.x} y="115" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" className="font-condensed font-bold">{lbl.l}</text>
              ))}
            </svg>
          </div>
          
          <h3 className="text-base font-serif font-bold text-white">Ventas Diarias</h3>
          <p className="text-xs text-white/50 mt-1 leading-relaxed">
            <span className="text-emerald-400 font-bold">(+15%)</span> de incremento en reservas este mes.
          </p>
          <div className="border-t border-white/5 my-4" />
          <p className="text-[10px] text-white/40 flex items-center gap-1.5 font-condensed">
            <Clock className="w-3.5 h-3.5 text-primary" />
            ACTUALIZADO HACE 4 MINUTOS
          </p>
        </div>

        {/* Chart 3: Destilaciones Completadas (Line Chart) */}
        <div className="bg-[#0F0F0E] border border-white/5 rounded-2xl p-5 pt-6 flex flex-col relative group hover:border-primary/10 transition-colors duration-500">
          <div className="w-full h-44 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#1C1304] to-[#0A0701] border border-primary/10 shadow-[0_10px_30px_rgba(197,160,89,0.1)]">
            <svg className="w-full h-full p-4 overflow-visible" viewBox="0 0 300 120">
              {[0, 30, 60, 90].map((y) => (
                <line key={y} x1="15" y1={y} x2="285" y2={y} stroke="rgba(197,160,89,0.06)" strokeWidth="0.5" strokeDasharray="3" />
              ))}
              <path
                d="M 20 95 L 60 70 L 100 80 L 140 40 L 180 50 L 220 20 L 250 35 L 280 15"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {[
                { cx: 20, cy: 95 },
                { cx: 60, cy: 70 },
                { cx: 100, cy: 80 },
                { cx: 140, cy: 40 },
                { cx: 180, cy: 50 },
                { cx: 220, cy: 20 },
                { cx: 250, cy: 35 },
                { cx: 280, cy: 15 }
              ].map((node, i) => (
                <circle key={i} cx={node.cx} cy={node.cy} r="3" fill="#C5A059" stroke="#FFFFFF" strokeWidth="1" />
              ))}
              {[
                { x: 20, l: 'Abr' },
                { x: 100, l: 'Jun' },
                { x: 180, l: 'Ago' },
                { x: 250, l: 'Oct' },
                { x: 280, l: 'Dic' }
              ].map((lbl, i) => (
                <text key={i} x={lbl.x} y="115" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" className="font-condensed font-bold">{lbl.l}</text>
              ))}
            </svg>
          </div>
          
          <h3 className="text-base font-serif font-bold text-white">Destilaciones</h3>
          <p className="text-xs text-white/50 mt-1 leading-relaxed">
            Lotes procesados y añejados en alambiques de cobre.
          </p>
          <div className="border-t border-white/5 my-4" />
          <p className="text-[10px] text-white/40 flex items-center gap-1.5 font-condensed">
            <Clock className="w-3.5 h-3.5 text-primary" />
            ACTUALIZADO JUSTO AHORA
          </p>
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* ROW 3: DOUBLE COLUMN PANEL (Proyectos + Historial Actividad)  */}
      {/* ------------------------------------------------------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        
        {/* Column Left (Wider): Distillery Batches Table */}
        <div className="lg:col-span-2 bg-[#0F0F0E] border border-white/5 rounded-2xl p-6 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">Lotes de Destilación</h3>
                <p className="text-xs text-white/40 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>30 lotes numerados completados este mes</span>
                </p>
              </div>
              <button className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Batches Table List */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="py-3 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">PRODUCTO / LOTE</th>
                    <th className="py-3 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">SOCIOS A CARGO</th>
                    <th className="py-3 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">VALOR LOTE</th>
                    <th className="py-3 text-[10px] tracking-widest font-condensed text-white/40 font-bold uppercase">PROGRESO / ESTADO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {productionBatches.map((batch) => (
                    <tr key={batch.id} className="hover:bg-white/[0.01] transition-colors group">
                      <td className="py-4 pr-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-serif font-bold text-white group-hover:text-primary transition-colors">{batch.name}</span>
                          <span className="text-[10px] text-white/40 mt-1 font-condensed tracking-wider">{batch.category}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center -space-x-1.5">
                          {batch.members.map((member, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full border border-[#060606] bg-primary/20 flex items-center justify-center text-[9px] font-bold text-primary font-serif"
                              title={`Miembro ${member}`}
                            >
                              {member}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 font-condensed text-sm font-bold text-white/90">
                        {batch.budget}
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col max-w-[140px] w-full gap-1.5">
                          <div className="flex justify-between items-center text-[10px] font-condensed font-bold">
                            <span className="text-primary">{batch.status}</span>
                            <span className="text-white/60">{batch.completion}%</span>
                          </div>
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(197,160,89,0.3)] transition-all duration-500"
                              style={{ width: `${batch.completion}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-xs">
            <span className="text-white/40 font-condensed">Métricas de producción en tiempo real</span>
            <Link
              href="/dashboard/productos"
              className="text-primary hover:text-white font-condensed font-bold tracking-widest flex items-center gap-1 transition-colors cursor-pointer"
            >
              GESTIONAR LOTES
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Column Right (Narrower): Activity Chronological Timeline */}
        <div className="lg:col-span-1 bg-[#0F0F0E] border border-white/5 rounded-2xl p-6 flex flex-col shadow-md justify-between">
          <div>
            <div className="border-b border-white/5 pb-4 mb-6">
              <h3 className="text-lg font-serif font-bold text-white">Registro de Actividad</h3>
              <p className="text-xs text-white/40 mt-1 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-emerald-400 font-condensed">+24%</span>
                <span>de actividad esta semana</span>
              </p>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-6 space-y-6">
              <div className="absolute left-[7.5px] top-2 bottom-2 w-[1px] bg-white/10" />

              {activityLogs.map((log) => {
                const LogIcon = log.icon
                return (
                  <div key={log.id} className="relative flex flex-col gap-1 text-left">
                    <span className={`
                      absolute -left-[24px] top-1 w-[17px] h-[17px] rounded-full border flex items-center justify-center z-10
                      ${log.color}
                    `}>
                      <LogIcon className="w-2.5 h-2.5 text-black shrink-0" />
                    </span>

                    <h4 className="text-xs font-serif font-bold text-white/90 leading-relaxed pr-2">
                      {log.title}
                    </h4>
                    <span className="text-[10px] text-white/40 font-condensed">
                      {log.time}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <button 
            className="w-full mt-6 py-3 border border-white/10 hover:border-primary/20 text-white/60 hover:text-primary rounded-xl font-condensed font-bold tracking-widest text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-white/[0.01]"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin [animation-duration:6s]" />
            ACTUALIZAR FLUJO
          </button>
        </div>

      </section>
    </>
  )
}
