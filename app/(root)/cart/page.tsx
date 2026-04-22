import { getMyCart } from '@/lib/actions/cart.actions'
import CartTable from './cart-table'
import { Suspense } from 'react'

export const metadata = {
  title: 'Cart',
}

const CartPage = async () => {
  const cart = await getMyCart()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartTable cart={cart} />
    </Suspense>
  )
}

export default CartPage
