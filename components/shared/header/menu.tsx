import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { EllipsisVertical } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import UserButton from './user-button'
import { Cart } from '@/types'

const Menu = ({ cart }: { cart?: Cart }) => {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex w-full max-w-xs gap-1 items-center'>
        <Button asChild variant='ghost'>
          <Link href='/cart' className='relative'>
            <Image src='/cart_icon.svg' alt='cart' height={25} width={25} />
            {cart && cart.items && cart?.items.length > 0 ? (
              <span className='absolute right-0 left-8 -top-2 h-[25px] w-[25px] bg-amber-300 text-navy rounded-full flex items-center justify-center'>
                <span>{cart?.items.reduce((a, c) => a + c.qty, 0)}</span>
              </span>
            ) : (
              ''
            )}
          </Link>
        </Button>
        <UserButton />
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
            <UserButton />
            <SheetDescription />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export default Menu
