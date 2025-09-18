'use client'

import { Button } from '@/components/ui/button'
import { Cart } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Loader, Minus, Plus, XIcon } from 'lucide-react'
import { toast } from 'sonner'
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions'
import { formatCurrency } from '@/lib/utils'

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <div>
      {!cart || cart.items.length === 0 ? (
        <div className='min-h-screen w-full flex flex-col items-center justify-center'>
          <div className='rounded-full flex items-center justify-center bg-gray-100 p-9 relative'>
            {/* <span className='absolute right-0 left-17 top-7 h-[25px] w-[25px] bg-amber-300 text-navy rounded-full flex items-center justify-center'>
              <span>0</span>
            </span> */}
            <Image src='/cart_icon.svg' alt='cart' width={40} height={40} />
          </div>
          <p className='text-gray-700 py-8 text-lg'>
            Your cart is currently empty
          </p>
          <Button asChild variant='purple' size='lg'>
            <Link href='/'>Go Shopping</Link>
          </Button>
          <div className='h-60'></div>
        </div>
      ) : (
        <div>
          <h1 className='text-gray-700 text-2xl font-medium'>
            Your cart ({cart.items.reduce((a, c) => a + c.qty, 0)})
          </h1>
          <div className='flex flex-col lg:flex-row'>
            <div className='pt-8 w-full'>
              <Table>
                <TableBody className=''>
                  {cart.items.map((item) => (
                    <TableRow
                      key={item.slug}
                      className='rounded-4xl border-gray-200 mb-4'
                    >
                      <TableCell className='p-4 sm:p-8 rounded-l-lg sm:w-[150px]'>
                        <Link
                          href={`/product/${item.slug}`}
                          className='flex items-center'
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={70}
                            height={70}
                          />
                        </Link>
                      </TableCell>
                      <TableCell className='flex flex-col justify-start pt-8'>
                        <p className='px-2 mb-1 text-gray-700 font-medium'>
                          {item.title}
                        </p>
                        <p className='px-2 text-gray-500'>{item.author}</p>
                      </TableCell>

                      <TableCell>
                        <Button
                          disabled={isPending}
                          variant='outline'
                          className='text-gray-300 cursor-pointer'
                          type='button'
                          onClick={() =>
                            startTransition(async () => {
                              const res = await removeItemFromCart(
                                item.productId
                              )

                              if (!res.success) {
                                if (!res.success) {
                                  toast.warning(res.message)
                                }
                              }
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className='w-4 h-4 animate-spin' />
                          ) : (
                            <Minus className='w-4 h-4 text-gray-600' />
                          )}
                        </Button>
                        <span className='px-4 text-lg'>{item.qty}</span>
                        <Button
                          disabled={isPending}
                          variant='outline'
                          className='text-gray-300 cursor-pointer'
                          type='button'
                          onClick={() =>
                            startTransition(async () => {
                              const res = await addItemToCart(item)

                              if (!res.success) {
                                toast.warning(res.message)
                              }
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className='w-4 h-4 animate-spin' />
                          ) : (
                            <Plus className='w-4 h-4 text-gray-600' />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className='relative text-right rounded-r-lg pr-8 text-xl text-gray-700 font-semibold'>
                        ${item.price}
                        <span
                          onClick={() => removeItemFromCart(item.productId)}
                          className='flex items-center justify-center absolute right-5 top-5 bg-primary-purple/10 rounded-full p-2 cursor-pointer hover:bg-primary-purple/20 transition-all duration-300'
                        >
                          <XIcon className='w-4 h-4 text-primary-purple/60 font-semibold hover:text-primary-purple/90 transition-all duration-300' />
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Card className='min-w-[200px] mt-11 border-transparent shadow-none ml-8 bg-gray-50 h-[350px] pt-0'>
              <CardContent className='p-4 flex flex-col h-full justify-between'>
                <div className='pb-3 text-xl flex flex-col'>
                  <p className='flex border-b border-gray-200 pb-4 font-medium text-gray-800'>
                    Summary
                  </p>
                  <span className='font-bold mt-8 text-gray-700'>
                    {formatCurrency(cart.itemsPrice)}
                  </span>
                </div>
                <Button
                  variant='purple'
                  size='lg'
                  className='w-full cursor-pointer'
                  disabled={isPending}
                  onClick={() =>
                    startTransition(() => router.push('/shipping-address'))
                  }
                >
                  {isPending ? (
                    <Loader className='w-4 h-4 animate-spin' />
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartTable
