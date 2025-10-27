import { Metadata } from 'next'
import { getMyOrders } from '@/lib/actions/order.actions'
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CheckIcon } from 'lucide-react'
import Pagination from '@/components/shared/pagination'

export const metadata: Metadata = {
  title: 'My Orders',
}

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>
}) => {
  const { page } = await props.searchParams

  const orders = await getMyOrders({
    page: Number(page) || 1,
  })

  return (
    <div className='space-y-2'>
      <h2 className='h2-bold text-gray-600'>Orders</h2>
      <div className='overflow-x-auto text-gray-800'>
        <Table>
          <TableHeader>
            <TableRow className='text-primary-purple'>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt ? (
                    <div className='flex items-center'>
                      {formatDateTime(order.paidAt).dateTime}
                      <CheckIcon className='text-green-600 ml-3 pb-1' />
                    </div>
                  ) : (
                    <div className='text-red-600'>Not Paid</div>
                  )}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt ? (
                    <div className='flex items-center'>
                      {formatDateTime(order.deliveredAt).dateTime}
                      <CheckIcon className='text-green-600 ml-3 pb-1' />
                    </div>
                  ) : (
                    <div className='text-red-600'>Not Delivered</div>
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/order/${order.id}`}>
                    <span className='px-2 font-medium text-gray-400 hover:text-gray-500'>
                      Details
                    </span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Pagination
            page={Number(page || 1)}
            totalPages={orders?.totalPages}
          />
        )}
      </div>
    </div>
  )
}

export default OrdersPage
