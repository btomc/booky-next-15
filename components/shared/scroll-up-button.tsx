'use client'
import { Button } from '../ui/button'
import { ChevronUpIcon } from 'lucide-react'

const ScrollUpButton = () => {
  return (
    <Button
      variant='outlinePurple'
      onClick={() => scrollTo(0, 0)}
      className='cursor-pointer xxl:absolute xxl:-top-26 xxl:-right-15 rounded-full h-12 w-12'
    >
      <ChevronUpIcon className='size-7' />
    </Button>
  )
}

export default ScrollUpButton
