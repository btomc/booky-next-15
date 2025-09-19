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
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils'
import { Order } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

const OrderDetailsTable = ({ order }: { order: Order }) => {
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

  return (
    <>
      <h1 className='py-4 text-2xl my-2 text-gray-700 font-medium'>
        Order {formatId(id)}
      </h1>
      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='col-span-2 space-4-y overlow-x-auto'>
          <Card className='shadow-none'>
            <CardContent className='p-4 gap-4 text-gray-600'>
              <h2 className='text-xl pb-4 text-gray-700'>Payment Method</h2>
              <p className='mb-2'>{paymentMethod}</p>
              {isPaid ? (
                <Badge variant='purple' className='py-2'>
                  Paid at {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant='destructive' className='py-2'>
                  Not paid
                </Badge>
              )}
            </CardContent>
          </Card>
          <Card className='my-2 shadow-none'>
            <CardContent className='p-4 gap-4 text-gray-600'>
              <h2 className='text-xl pb-4 text-gray-700'>Shipping Address</h2>
              <p className='pb-2'>{shippingAddress.fullName}</p>
              <p className='mb-2'>
                {shippingAddress.streetAddress}, {shippingAddress.city}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isDelivered ? (
                <Badge variant='purple' className='py-2'>
                  Delivered at {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant='destructive' className='py-2'>
                  Not Delivered
                </Badge>
              )}
            </CardContent>
          </Card>
          <Card className='shadow-none'>
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
                          href={`/product/{item.slug}`}
                          className='flex items-center'
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={50}
                            height={50}
                          />
                          <div className='flex flex-col p-4'>
                            <span className='px-2 font-medium text-gray-700'>
                              {item.title}
                            </span>
                            <span className='px-2'>{item.author}</span>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>
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
          <Card className='shadow-none'>
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
              <div className='flex justify-between font-medium text-lg'>
                <div>Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default OrderDetailsTable
