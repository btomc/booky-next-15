import Link from 'next/link'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constants'
import Menu from './menu'
import { getMyCart } from '@/lib/actions/cart.actions'

const Header = async () => {
  const cart = await getMyCart()

  return (
    <header className='w-full border-b border-gray-200'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <Link href='/' className='flex-start'>
            <Image
              src='/booky-logo.svg'
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority={true}
            />
            <span className='hidden lg:block font-semibold text-2xl ml-3 text-primary-purple'>
              {APP_NAME}
            </span>
          </Link>
        </div>

        <Menu cart={cart} />
      </div>
    </header>
  )
}

export default Header
