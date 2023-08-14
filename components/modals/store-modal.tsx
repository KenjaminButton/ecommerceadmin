'use client'

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"

export const StoreModal = () => {
  const storeModal = useStoreModal()
  return (
    <Modal
      title='Create store'
      description ='Adding new stores to manage products and categories'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Fancy Create Store Form Coming Soon
    </Modal>
  )
}

