'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'
import { formUrlQuery } from '@/lib/utils'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

type PaginationProps = {
  page: number | string
  totalPages: number
  urlParamName?: string
}

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = (btnType: string) => {
    const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString(),
    })

    router.push(newUrl)
  }

  return (
    <div className='flex gap-4 mt-4'>
      <Button
        size='lg'
        variant='outlinePurple'
        className='w-28 cursor-pointer bg-transparent hover:bg-primary-purple/10'
        disabled={Number(page) <= 1}
        onClick={() => handleClick('prev')}
      >
        <ChevronLeftIcon />
        Previous
      </Button>
      <Button
        size='lg'
        variant='outlinePurple'
        className='w-28 cursor-pointer bg-transparent hover:bg-primary-purple/10'
        disabled={Number(page) >= totalPages}
        onClick={() => handleClick('next')}
      >
        Next
        <ChevronRightIcon />
      </Button>
    </div>
  )
}

export default Pagination
