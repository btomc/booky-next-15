import { requireAdmin } from '@/lib/auth-guard'
import { Metadata } from 'next'
import { deleteUser, getAllUsers } from '@/lib/actions/user.actions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatId } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Pagination from '@/components/shared/pagination'
import { Badge } from '@/components/ui/badge'
import DeleteDialog from '@/components/shared/delete-dialog'
import { auth } from '@/auth'

export const metadata: Metadata = {
  title: 'Admin Users',
}

const AdminUsersPage = async (props: {
  searchParams: Promise<{
    page: string
    query: string
  }>
}) => {
  await requireAdmin()

  const session = await auth()
  const selfId = session?.user.id
  const { page = '1', query: searchText } = await props.searchParams

  const users = await getAllUsers({ page: Number(page), query: searchText })

  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-3'>
        <h1 className='h2-bold text-gray-700'>Users</h1>
        {searchText && (
          <div className='text-gray-600 flex items-center gap-2'>
            (Filtered by <i>&quot;{searchText}&quot;</i> )
            <Link href='/admin/users' className='ml-2'>
              <Button variant='outline' size='sm' className='cursor-pointer'>
                Remove Filter
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className='overflow-x-auto text-gray-600'>
        <Table>
          <TableHeader>
            <TableRow className='text-primary-purple-dull'>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{formatId(user.id)}</TableCell>
                <TableCell className='font-medium'>{user.name}</TableCell>
                <TableCell className='text-gray-600 text-[13px] mt-0.5'>
                  {user.email}
                </TableCell>
                <TableCell>
                  {user.role === 'user' ? (
                    <Badge variant='green'>User</Badge>
                  ) : (
                    <Badge variant='purple'>Admin</Badge>
                  )}
                </TableCell>

                <TableCell>
                  <Button asChild variant='outlineGray' size='sm'>
                    <Link href={`/admin/users/${user.id}`}>Edit</Link>
                  </Button>
                  {user.id !== selfId && (
                    <DeleteDialog id={user.id} action={deleteUser} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users.totalPages > 1 && (
          <Pagination page={Number(page) || 1} totalPages={users?.totalPages} />
        )}
      </div>
    </div>
  )
}

export default AdminUsersPage
