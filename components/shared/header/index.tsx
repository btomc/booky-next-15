import Link from 'next/link'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { UserIcon } from 'lucide-react'

const Header = () => {
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

        <div className='space-x-2 flex items-center'>
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
        </div>
      </div>
    </header>
  )
}

export default Header
