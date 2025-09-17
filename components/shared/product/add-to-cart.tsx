'use client'
import { Button } from '@/components/ui/button'
import { Plus, ShoppingCart } from 'lucide-react'
import { Cart, CartItem } from '@/types'

import { addItemToCart } from '@/lib/actions/cart.actions'
import { toast } from 'sonner'

const AddToCart = ({ item }: { item: CartItem }) => {
  const handleAddToCart = async () => {
    const res = await addItemToCart(item)

    if (!res.success) {
      toast.error(res.message)
      return
    }

    // Handle success add to cart
    toast.success(res.message)
  }

  return (
    <div>
      <Button
        type='button'
        variant='purple'
        size='xl'
        className='cursor-pointer w-full'
        onClick={handleAddToCart}
      >
        Add to cart
        <ShoppingCart className='ml-2' />
      </Button>
    </div>
  )
}

export default AddToCart
