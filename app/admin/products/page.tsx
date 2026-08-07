import Link from 'next/link'

import Pagination from '@/components/shared/pagination'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { deleteProduct, getAllProducts } from '@/lib/actions/product.actions'
import { requireAdmin } from '@/lib/auth-guard'
import { formatCurrency, formatId } from '@/lib/utils'
import DeleteDialog from '@/components/shared/delete-dialog'

const AdminProductsPage = async (props: {
  searchParams: Promise<{
    page: string
    query: string
  }>
}) => {
  await requireAdmin()

  const searchParams = await props.searchParams

  const page = Number(searchParams.page) || 1
  const searchText = searchParams.query || ''

  const products = await getAllProducts({
    query: searchText,
    page,
  })

  return (
    <div className='space-y-2 text-gray-600'>
      <div className='flex-between pb-3'>
        <div className='flex items-center gap-3'>
          <h1 className='h2-bold text-gray-700'>Products</h1>
          {searchText && (
            <div className='text-gray-600 flex items-center gap-2'>
              (Filtered by <i>&quot;{searchText}&quot;</i> )
              <Link href='/admin/products' className='ml-2'>
                <Button variant='outline' size='sm' className='cursor-pointer'>
                  Remove Filter
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Button asChild variant='purple'>
          <Link href='/admin/products/create'>Create Product</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className='text-primary-purple-dull'>
            <TableHead>ID</TableHead>
            <TableHead>TITLE</TableHead>
            <TableHead>AUTHOR</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead>GENRES</TableHead>
            <TableHead>STOCK</TableHead>
            <TableHead>RATING</TableHead>
            <TableHead className='w-[100px]'>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.data.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{formatId(product.id)}</TableCell>
              <TableCell className='line-clamp-1 font-medium text-gray-700'>
                {product.title}
              </TableCell>
              <TableCell className='text-gray-600/85'>
                {product.author}
              </TableCell>
              <TableCell className='font-medium text-gray-800'>
                {formatCurrency(product.price)}
              </TableCell>
              <TableCell className='text-[13px] flex items-center'>
                {product.genre}
              </TableCell>
              <TableCell className='pl-5'>{product.stock}</TableCell>
              <TableCell className='pl-5'>{Number(product.rating)}</TableCell>
              <TableCell className='flex gap-1'>
                <Button asChild variant='outlineGray' size='sm'>
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                </Button>
                <DeleteDialog id={product.id} action={deleteProduct} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {products?.totalPages > 1 && (
        <Pagination page={page} totalPages={products.totalPages} />
      )}
    </div>
  )
}

export default AdminProductsPage
