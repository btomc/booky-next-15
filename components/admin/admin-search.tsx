'use client'

import { useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Input } from '../ui/input'

const AdminSearch = () => {
  const pathname = usePathname()
  const formActionUrl = pathname.includes('/admin/orders')
    ? '/admin/orders'
    : pathname.includes('/admin/users')
    ? '/admin/users'
    : '/admin/products'

  const searchParams = useSearchParams()
  const [queryValue, setQueryValue] = useState(searchParams.get('query') || '')

  useEffect(() => {
    setQueryValue(searchParams.get('query') || '')
  }, [searchParams])

  return (
    <form action={formActionUrl} method='GET'>
      <Input
        type='search'
        placeholder='Search...'
        name='query'
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        className='w-[100px] sm:w-[200px] md:w-[100px] lg:w-[300px] rounded border-2 border-solid border-slate-200 focus-visible:ring-primary-purple/70'
      />
      <button className='sr-only' type='submit'>
        Search
      </button>
    </form>
  )
}

export default AdminSearch
