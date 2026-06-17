'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground gap-6 px-4 text-center">
      <h2 className="text-2xl font-serif">Ocurrió un error inesperado</h2>
      <p className="text-sm font-sans text-foreground/50 max-w-sm">
        No pudimos cargar esta página. Por favor intentá de nuevo o volvé al inicio.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-black text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-foreground hover:text-white transition-colors"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-black/20 text-foreground/60 text-xs font-bold tracking-widest uppercase rounded-sm hover:border-primary hover:text-primary transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
