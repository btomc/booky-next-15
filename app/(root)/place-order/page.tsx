import { auth } from '@/auth'
import { getMyCart } from '@/lib/actions/cart.actions'
import { getUserById } from '@/lib/actions/user.actions'
import { ShippingAddress } from '@/types'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import CheckoutSteps from '@/components/shared/checkout-steps'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utils'
import PlaceOrderForm from './plade-order-form'

export const metadata: Metadata = {
  title: 'Place Order',
}

const PlaceOrderPage = async () => {
  const cart = await getMyCart()
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error('User not found')

  const user = await getUserById(userId)

  if (!cart || cart.items.length === 0) redirect('/cart')
  if (!user.address) redirect('/shipping-address')
  if (!user.paymentMethod) redirect('/payment-method')

  const userAddress = user.address as ShippingAddress

  return (
    <>
      <CheckoutSteps current={3} />
      <h1 className='py-4 text-2xl mt-2 text-gray-700 font-medium'>
        Place Order
      </h1>
      <div className='grid lg:grid-cols-3 md:gap-5'>
        <div className='lg:col-span-2 overflow-x-auto space-y-4'>
          <Card className='shadow-none pt-2'>
            <CardContent className='p-4 gap-4 text-gray-600'>
              <h2 className='text-xl pb-4 text-gray-700'>Shipping Address</h2>
              <p className='text-sm'>{userAddress.fullName}</p>
              <p className='text-sm'>
                {userAddress.streetAddress}, {userAddress.city}{' '}
                {userAddress.postalCode}, {userAddress.country}{' '}
              </p>
              <div className='mt-3'>
                <Link href='/shipping-address'>
                  <Button variant='outlinePurple' className='cursor-pointer'>
                    Edit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-none pt-2'>
            <CardContent className='p-4 gap-4 text-gray-600'>
              <h2 className='text-xl pb-4 text-gray-700'>Payment Method</h2>
              <p className='text-sm'>{user.paymentMethod}</p>
              <div className='mt-3'>
                <Link href='/payment-method'>
                  <Button variant='outlinePurple' className='cursor-pointer'>
                    Edit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-none pt-2'>
            <CardContent className='p-4 gap-4 text-gray-600'>
              <h2 className='text-xl pb-4 text-gray-700'>Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className='flex items-center'
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={50}
                            height={50}
                          />
                          <div className='flex flex-col p-4 min-w-[220px]'>
                            <span className='px-2 font-medium text-gray-700'>
                              {item.title}
                            </span>
                            <span className='px-2'>{item.author}</span>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className='min-w-[120px]'>
                        <span className='px-2'>{item.qty}</span>
                      </TableCell>
                      <TableCell className='text-left'>${item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className='border border-gray-200 bg-gray-50/50 my-4 shadow-none'>
            <CardContent className='p-4 pt-0 gap-4 space-y-4 text-gray-700'>
              <div>
                <h2 className='text-lg text-gray-700 font-medium border-b border-gray-200 pb-4'>
                  Summary
                </h2>
              </div>
              <div className='flex justify-between'>
                <div>Items</div>
                <div>{formatCurrency(cart.itemsPrice)}</div>
              </div>

              <div className='flex justify-between border-b border-gray-200 pb-4'>
                <div>Shipping</div>
                <div>{formatCurrency(cart.shippingPrice)}</div>
              </div>
              <div className='flex justify-between font-medium text-lg'>
                <div>Total</div>
                <div>{formatCurrency(cart.totalPrice)}</div>
              </div>
              <PlaceOrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default PlaceOrderPage
