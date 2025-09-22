import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Unauthorized Access',
}

export default function UnauthorizedPage() {
  return (
    <div className='container mx-auto flex h-[calc(100vh-200px)] flex-col items-center justify-center space-y-4'>
      <h1 className='h1-bold text-4xl text-gray-700'>Unauthorized Access</h1>
      <p className='text-gray-600'>
        You do not have permission to access this page.
      </p>
      <Button asChild variant='navyDull' size='lg' className='cursor-pointer'>
        <Link href='/'>Return Home</Link>
      </Button>
    </div>
  )
}
