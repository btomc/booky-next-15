import { Button } from '@/components/ui/button'
import React from 'react'

const Homepage = () => {
  return (
    <div className='text-2xl flex flex-wrap w-full h-full'>
      Homepage
      <Button variant='purple' className='m-4'>
        Add
      </Button>
      <Button variant='outline' className='m-4 text-primary-purple'>
        Add
      </Button>
      <Button variant='navy' className='m-4'>
        Add
      </Button>
      <Button variant='secondary' className='m-4'>
        Add
      </Button>
      <Button variant='ghost' className='m-4'>
        Add
      </Button>
    </div>
  )
}

export default Homepage
