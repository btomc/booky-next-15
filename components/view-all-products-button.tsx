import { Button } from './ui/button'
import Link from 'next/link'

const ViewAllProductsButton = () => {
  return (
    <div className='flex justify-center items-center my-8'>
      <Button
        asChild
        className='px-7 py-6 text-lg font-normal'
        variant='navyDull'
      >
        <Link href='/search'>View All Products</Link>
      </Button>
    </div>
  )
}

export default ViewAllProductsButton
