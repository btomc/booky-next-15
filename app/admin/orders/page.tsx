import { auth } from '@/auth'
import Pagination from '@/components/shared/pagination'
import { deleteOrder, getAllOrders } from '@/lib/actions/order.actions'
import { requireAdmin } from '@/lib/auth-guard'
import { Metadata } from 'next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils'
import { CheckIcon } from 'lucide-react'
import DeleteDialog from '@/components/shared/delete-dialog'

export const metadata: Metadata = {
  title: 'Admin Orders',
}

const AdminOrdersPage = async (props: {
  searchParams: Promise<{ page: string }>
}) => {
  await requireAdmin()

  const { page = '1' } = await props.searchParams

  const session = await auth()

  if (session?.user?.role !== 'admin') throw new Error('User is not authorized')

  const orders = await getAllOrders({
    page: Number(page),
    // limit: 2,
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
              <TableHead>BUYER</TableHead>
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
                <TableCell>{order.user.name}</TableCell>
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
                  <Button asChild variant='outlineGray' size='sm'>
                    <Link href={`/order/${order.id}`}>
                      <span className='px-2 font-medium'>Details</span>
                    </Link>
                  </Button>
                  <DeleteDialog id={order.id} action={deleteOrder} />
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

export default AdminOrdersPage
