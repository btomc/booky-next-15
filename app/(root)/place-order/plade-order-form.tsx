'use client'

import { useRouter } from 'next/navigation'
import { Check, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { createOrder } from '@/lib/actions/order.actions'

const PlaceOrderForm = () => {
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const res = await createOrder()

    if (res.redirectTo) {
      router.push(res.redirectTo)
    }
  }

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button
        disabled={pending}
        variant='purple'
        size='xl'
        className='w-full mt-4 cursor-pointer'
      >
        {pending ? (
          <LoaderCircle className='w-4 h-4 animate-spin' />
        ) : (
          <Check className='w-4 h-4' />
        )}{' '}
        Place Order
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <PlaceOrderButton />
    </form>
  )
}

export default PlaceOrderForm
