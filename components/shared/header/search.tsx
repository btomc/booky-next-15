import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SearchIcon } from 'lucide-react'

const Search = async () => {
  return (
    <form action='/search' method='GET'>
      <div className='flex w-full max-w-sm items-center space-x-2'>
        <Select name='category' defaultValue='all'>
          <SelectTrigger className='w-[180px] rounded border-2 border-solid border-slate-200 focus-visible:ring-primary-purple/70 text-gray-500'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent className='border-gray-200 bg-white text-gray-500'>
            <SelectItem key='All' value='all'>
              All
            </SelectItem>
          </SelectContent>
        </Select>
        <Input
          name='q'
          type='text'
          placeholder='Search...'
          className='md:w-[100px] lg:w-[300px] rounded border-2 border-solid border-slate-200 focus-visible:ring-primary-purple/70'
        />
        <Button variant='outlineGray' className='cursor-pointer'>
          <SearchIcon />
        </Button>
      </div>
    </form>
  )
}

export default Search
