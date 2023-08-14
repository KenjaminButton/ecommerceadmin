'use client'

import { useEffect, useState } from "react"

import { StoreModal } from "@/components/modals/store-modal"

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)
  // Precaution to avoid hydration errors (server side rendering vs client side rendering)
  useEffect( () => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  return (
    <>
      <StoreModal />
    </>
  )
}

