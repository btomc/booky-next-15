'use client'
import { Button } from '@/components/ui/button'
import { LoaderCircle, Minus, Plus, ShoppingCart } from 'lucide-react'
import { Cart, CartItem } from '@/types'

import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions'
import { toast } from 'sonner'
import { useTransition } from 'react'

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const [isPending, startTransition] = useTransition()

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item)

      if (!res.success) {
        toast.error(res.message)
        return
      }

      // Handle success add to cart
      toast.success(res.message)
    })
  }

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId)

      if (res.success) {
        toast.success(res.message)
      } else {
        toast.warning(res.message)
      }
    })
  }

  // Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId)

  return existItem ? (
    <div className='flex items-center justify-center'>
      <Button
        type='button'
        variant='outline'
        size='lg'
        className='cursor-pointer text-primary-purple-light w-12'
        onClick={handleRemoveFromCart}
      >
        {isPending ? (
          <LoaderCircle className='w-4 h-4 animate-spin' />
        ) : (
          <Minus className='w-4 h-4' />
        )}
      </Button>
      <span className='px-4 text-gray-700'>{existItem.qty}</span>
      <Button
        type='button'
        variant='purple'
        size='lg'
        className='cursor-pointer w-12'
        onClick={handleAddToCart}
      >
        {isPending ? (
          <LoaderCircle className='w-4 h-4 animate-spin' />
        ) : (
          <Plus className='w-4 h-4' />
        )}{' '}
      </Button>
    </div>
  ) : (
    <div>
      <Button
        type='button'
        variant='purple'
        size='lg'
        className='cursor-pointer w-full'
        onClick={handleAddToCart}
      >
        Add To Cart
        {isPending ? (
          <LoaderCircle className='w-4 h-4 animate-spin' />
        ) : (
          <ShoppingCart className='ml-2' />
        )}{' '}
      </Button>
    </div>
  )
}

export default AddToCart
