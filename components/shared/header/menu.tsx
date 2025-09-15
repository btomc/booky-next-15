import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { EllipsisVertical, UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Menu = () => {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex w-full max-w-xs gap-1 items-center'>
        <Button asChild variant='ghost'>
          <Link href='/cart'>
            <Image src='/cart_icon.svg' alt='cart' height={25} width={25} />
          </Link>
        </Button>
        <Button asChild variant='purple' size='lg' className='rounded-full'>
          <Link href='/sign-in' className='text-primary-purple'>
            <UserIcon /> Login
          </Link>
        </Button>
      </nav>

      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle'>
            <EllipsisVertical className='text-navy-dull cursor-pointer' />
          </SheetTrigger>
          <SheetContent className='flex flex-col items-start bg-gray-100 border-gray-300 p-6'>
            <SheetTitle className='mb-4'>Menu</SheetTitle>

            <Button asChild variant='ghost'>
              <Link href='/cart'>
                <Image src='/cart_icon.svg' alt='cart' height={25} width={25} />
              </Link>
            </Button>
            <Button asChild variant='purple' size='lg' className='rounded-full'>
              <Link href='/sign-in' className='text-primary-purple'>
                <UserIcon /> Login
              </Link>
            </Button>
            <SheetDescription />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export default Menu
