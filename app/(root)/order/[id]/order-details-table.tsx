'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils'
import { Order } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import {
  approvePaypalOrder,
  createPayPalOrder,
  deliverOrder,
  updateOrderToPaidCOD,
} from '@/lib/actions/order.actions'
import { CheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import StripePayment from './stripe-payment'

const OrderDetailsTable = ({
  order,
  paypalClientId,
  isAdmin,
  stripeClientSecret,
}: {
  order: Order
  paypalClientId: string
  isAdmin: boolean
  stripeClientSecret: string | null
}) => {
  const {
    id,
    shippingAddress,
    orderItem,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
  } = order

  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer()
    let status = ''

    if (isPending) {
      status = 'Loading PayPal...'
    } else if (isRejected) {
      status = 'Error Loading PayPal'
    }
    return status
  }

  const handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(order.id)

    if (!res.success) {
      toast.error(res.message)
    }

    return res.data
  }

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePaypalOrder(order.id, data)

    if (res.success) {
      toast.success(res.message)
    } else {
      toast.warning(res.message)
    }
  }

  // Button to mark order as paid
  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition()

    return (
      <Button
        type='button'
        variant='purple'
        className='cursor-pointer'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidCOD(order.id)

            if (res.success) {
              toast.success(res.message)
            } else {
              toast.error(res.message)
            }
          })
        }
      >
        {isPending ? 'Processing...' : 'Mark As Paid'}
      </Button>
    )
  }

  // Button to mark order as delivered
  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition()

    return (
      <Button
        type='button'
        variant='purple'
        className='cursor-pointer'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await deliverOrder(order.id)
            if (res.success) {
              toast.success(res.message)
            } else {
              toast.error(res.message)
            }
          })
        }
      >
        {isPending ? 'Processing...' : 'Mark As Delivered'}
      </Button>
    )
  }

  return (
    <>
      <h1 className='py-4 text-2xl my-2 text-gray-700 font-medium'>
        Order {formatId(id)}
      </h1>
      <div className='grid justify-center justify-self grid-cols-1 lg:grid-cols-3 gap-5'>
        <div className='col-span-1 sm:col-span-2 space-y-4 overlow-x-auto lg:pb-4'>
          <Card className='shadow-none pt-2'>
            <CardContent className='p-4 gap-4 text-gray-600'>
              <h2 className='text-xl pb-4 text-gray-800'>Payment Method</h2>
              <p className='mb-3 text-sm'>{paymentMethod}</p>
              {isPaid ? (
                <Badge variant='purple' className='py-2'>
                  Paid at {formatDateTime(paidAt!).dateTime}
                  <CheckIcon className='text-primary-purple-dull ml-4' />
                </Badge>
              ) : (
                <Badge variant='destructive' className='py-2'>
                  Not Paid
                </Badge>
              )}
            </CardContent>
          </Card>
          <Card className='my-2 shadow-none pt-2'>
            <CardContent className='p-4 gap-4 text-gray-600'>
              <h2 className='text-xl pb-4 text-gray-800'>Shipping Address</h2>
              <p className='pb-2 text-sm'>{shippingAddress.fullName}</p>
              <p className='mb-3 text-sm'>
                {shippingAddress.streetAddress}, {shippingAddress.city}{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isDelivered ? (
                <Badge variant='purple' className='py-2'>
                  Delivered at {formatDateTime(deliveredAt!).dateTime}
                  <CheckIcon className='text-primary-purple-dull ml-4' />
                </Badge>
              ) : (
                <Badge variant='destructive' className='py-2'>
                  Not Delivered
                </Badge>
              )}
            </CardContent>
          </Card>
          <Card className='shadow-none mt-4 pt-2'>
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
                  {orderItem.map((item) => (
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
                          <div className='flex flex-col p-4 min-w-[220px] w-[360px] line-clamp-1'>
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
          <Card className='shadow-none border border-gray-200 bg-gray-50/70 mb-4 pt-2'>
            <CardContent className='p-4 gap-4 space-y-4 text-gray-700'>
              <div>
                <h2 className='text-xl text-gray-700 font-medium border-b border-gray-200 pb-4'>
                  Summary
                </h2>
              </div>
              <div className='flex justify-between'>
                <div>Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>

              <div className='flex justify-between border-b border-gray-200 pb-4'>
                <div>Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className='flex justify-between font-medium text-lg mb-8'>
                <div>Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>
              {/* PayPal Payment */}
              {!isPaid && paymentMethod === 'PayPal' && (
                <div>
                  <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                    <PrintLoadingState />
                    <PayPalButtons
                      createOrder={handleCreatePayPalOrder}
                      onApprove={handleApprovePayPalOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              )}

              {/* Stripe Payment */}
              {!isPaid && paymentMethod === 'Stripe' && stripeClientSecret && (
                <StripePayment
                  priceInCents={Number(order.totalPrice) * 100}
                  orderId={order.id}
                  clientSecret={stripeClientSecret}
                />
              )}

              {/* Cash On Delivery */}
              {isAdmin && !isPaid && paymentMethod === 'CashOnDelivery' && (
                <MarkAsPaidButton />
              )}
              {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredButton />}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default OrderDetailsTable
