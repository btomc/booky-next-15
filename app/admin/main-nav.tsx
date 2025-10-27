'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { EllipsisVertical } from 'lucide-react'

const links = [
  {
    title: 'Overview',
    href: '/admin/overview',
  },
  {
    title: 'Products',
    href: '/admin/products',
  },
  {
    title: 'Orders',
    href: '/admin/orders',
  },
  {
    title: 'Users',
    href: '/admin/users',
  },
]

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname()
  return (
    <>
      <nav
        className={cn(
          'hidden md:flex items-center space-x-4 lg:space-x-6',
          className
        )}
        {...props}
      >
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary-purple',
              pathname.includes(item.href)
                ? 'text-primary-purple font-semibold'
                : 'text-gray-400'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle'>
            <EllipsisVertical className='text-gray-600 cursor-pointer' />
          </SheetTrigger>
          <SheetContent
            className='flex flex-col items-center gap-y-3 bg-gray-50 w-[200px] border-gray-200'
            side='left'
          >
            <SheetTitle className='text-gray-600 my-4'>Admin Menu</SheetTitle>
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-[15px] font-medium transition-colors hover:text-primary-purple',
                  pathname.includes(item.href)
                    ? 'text-primary-purple font-semibold'
                    : 'text-gray-400'
                )}
              >
                {item.title}
              </Link>
            ))}
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  )
}

export default MainNav
