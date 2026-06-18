'use client'

import dynamic from 'next/dynamic'

const AgeGate    = dynamic(() => import('./AgeGate').then(m => ({ default: m.AgeGate })),       { ssr: false })
const CartDrawer = dynamic(() => import('./CartDrawer').then(m => ({ default: m.CartDrawer })),  { ssr: false })

export function ClientShell() {
  return (
    <>
      <AgeGate />
      <CartDrawer />
    </>
  )
}
