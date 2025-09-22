import { requireAdmin } from '@/lib/auth-guard'
import { Metadata } from 'next'
import { getAllUsers } from '@/lib/actions/user.actions'
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

export const metadata: Metadata = {
  title: 'Admin Users',
}

const AdminUsersPage = async (props: {
  searchParams: Promise<{
    page: string
  }>
}) => {
  await requireAdmin()

  const { page = '1' } = await props.searchParams

  const users = await getAllUsers({ page: Number(page) })
  // console.log(users)

  return (
    <div className='space-y-2'>
      <h2 className='h2-bold text-gray-700'>Users</h2>
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
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === 'user' ? (
                    <Badge variant='green'>User</Badge>
                  ) : (
                    <Badge variant='purple'>Admin</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button asChild variant='outlineGray' size='sm'>
                    <Link href={`admin/users/${user.id}`}>Edit</Link>
                  </Button>
                  {/* DELETE USER */}
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
