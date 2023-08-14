'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'


// Zustand
const formSchema = z.object({
  name: z.string().min(1)
})


export const StoreModal = () => {
  const storeModal = useStoreModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('store-modal.tsx values...', values)
    // Create Store. 

  }

  return (
    <Modal
      title='Create store'
      description ='Adding new stores to manage products and categories'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      Name
                    </FormLabel>
                  </FormItem>
                )}
              />


            </form>
          </Form>
        </div>
      </div>
      
    </Modal>
  )
}

