import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LockIcon } from 'lucide-react'

const LockButton = () => {
  return (
    <div className='absolute -top-3 right-1'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            className='flex items-center justify-center gap-2 p-3 bg-gray-200! rounded-full mr-2 hover:bg-gray-200/80 cursor-pointer border-gray-200 size-10'
          >
            <LockIcon className='size-4 text-gray-600' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='border-gray-200 bg-white' align='end'>
          <div className='flex flex-col p-3'>
            <p className='text-sm text-zinc-700 mb-1 flex flex-col'>
              Admin:
              <span className='text-zinc-500 text-xs'>
                {process.env.ADMIN_EMAIL}
              </span>
            </p>

            <p className='text-sm text-zinc-700 flex flex-col'>
              Pass:
              <span className='text-zinc-500 text-xs'>
                {process.env.ADMIN_PASS}
              </span>
            </p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default LockButton
