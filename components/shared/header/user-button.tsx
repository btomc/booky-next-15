import Link from 'next/link'
import { auth } from '@/auth'
import { UserIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { signOutUser } from '@/lib/actions/user.actions'

const UserButton = async () => {
  const session = await auth()

  if (!session) {
    return (
      <Button asChild variant='purple' size='lg' className='rounded-full'>
        <Link href='/sign-in' className='text-primary-purple'>
          <UserIcon /> Login
        </Link>
      </Button>
    )
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U'

  return (
    <div className='flex gap-2 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex items-center'>
            <Button
              variant='ghost'
              className='relativee w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-primary-purple/85 text-gray-50 font-semibold cursor-pointer'
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='w-56 border-gray-200 z-20 bg-white p-4 text-gray-700'
          align='end'
          forceMount
        >
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <div className='text-sm font-medium leading-none'>
                {session.user?.name}
              </div>
              <div className='text-sm leading-none text-primary-purple-dull'>
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem>
            <Link href='/user/profile' className='w-full'>
              User Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className='p-0 mb-1'>
            <form action={signOutUser} className='w-full'>
              <Button
                className='w-full py-4 px-2 h-4 justify-start cursor-pointer mt-4 border-t border-gray-200 pt-6'
                variant='ghost'
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserButton
