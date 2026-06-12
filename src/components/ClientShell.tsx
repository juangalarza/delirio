'use client'

import { CartDrawer } from '@/components/CartDrawer'
import { AgeGate } from '@/components/AgeGate'

export function ClientShell() {
  return (
    <>
      <AgeGate />
      <CartDrawer />
    </>
  )
}
