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
  searchParams: Promise<{ page: string; query: string }>
}) => {
  await requireAdmin()

  const { page = '1', query: searchText } = await props.searchParams

  const session = await auth()

  if (session?.user?.role !== 'admin') throw new Error('User is not authorized')

  const orders = await getAllOrders({
    page: Number(page),
    query: searchText,
  })

  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-3'>
        <h1 className='h2-bold text-gray-700'>Orders</h1>
        {searchText && (
          <div className='text-gray-600 flex items-center gap-2'>
            (Filtered by <i>&quot;{searchText}&quot;</i> )
            <Link href='/admin/orders' className='ml-2'>
              <Button variant='outline' size='sm' className='cursor-pointer'>
                Remove Filter
              </Button>
            </Link>
          </div>
        )}
      </div>
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
                <TableCell className='font-medium'>
                  {formatId(order.id)}
                </TableCell>
                <TableCell className='text-xs text-gray-700/90'>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell className='font-semibold text-gray-800'>
                  {formatCurrency(order.totalPrice)}
                </TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt ? (
                    <div className='flex items-center text-xs'>
                      {formatDateTime(order.paidAt).dateTime}
                      <CheckIcon className='text-green-600 ml-3 pb-1' />
                    </div>
                  ) : (
                    <div className='text-red-600 text-xs'>Not Paid</div>
                  )}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt ? (
                    <div className='flex items-center text-xs'>
                      {formatDateTime(order.deliveredAt).dateTime}
                      <CheckIcon className='text-green-600 ml-3 pb-1' />
                    </div>
                  ) : (
                    <div className='text-red-600 text-xs'>Not Delivered</div>
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
