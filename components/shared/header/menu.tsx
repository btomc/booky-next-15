import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import UserButton from './user-button'
import { Cart } from '@/types'
import { SearchIcon } from 'lucide-react'

const Menu = ({ cart }: { cart?: Cart }) => {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='flex w-full max-w-xs gap-1 items-center'>
        <div className='md:hidden'>
          <Link href='/search'>
            <SearchIcon className='text-gray-700' />
          </Link>
        </div>
        <Button asChild variant='ghost'>
          <Link href='/cart' className='relative'>
            <Image src='/cart_icon.svg' alt='cart' height={25} width={25} />
            {cart && cart.items && cart?.items.length > 0 ? (
              <span className='absolute right-0 left-8 -top-2 h-[25px] w-[25px] bg-primary-purple-dull text-white rounded-full flex items-center justify-center'>
                <span>{cart?.items.reduce((a, c) => a + c.qty, 0)}</span>
              </span>
            ) : (
              <span className='absolute right-0 left-8 -top-2 h-[25px] w-[25px] bg-primary-purple-dull text-white rounded-full flex items-center justify-center'>
                <span>0</span>
              </span>
            )}
          </Link>
        </Button>
        <UserButton />
      </nav>
    </div>
  )
}

export default Menu
