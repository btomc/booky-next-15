import Link from 'next/link'

const ViewAllProductsButton = () => {
  return (
    <Link
      href='/search'
      className='flex items-center mt-1.5 mb-4 ml-6 text-primary-purple hover:text-primary-purple/80 transition-all text-[15px] font-normal'
    >
      See all
    </Link>
  )
}

export default ViewAllProductsButton
