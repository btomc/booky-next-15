import { getMyCart } from '@/lib/actions/cart.actions'
import CartTable from './cart-table'

export const metadata = {
  title: 'Cart',
}

const CartPage = async () => {
  const cart = await getMyCart()

  return (
    <div className='bg-gray-100'>
      <CartTable cart={cart} />
    </div>
  )
}

export default CartPage
