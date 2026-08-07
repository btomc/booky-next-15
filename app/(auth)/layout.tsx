import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex-center min-h-screen w-full relative'>
      <Link
        href='/'
        className='absolute left-5 top-5 flex items-center text-gray-600 hover:text-primary-purple'
      >
        <ChevronLeft className='size-4 mr-1' />
        Back
      </Link>
      {children}
    </div>
  )
}
