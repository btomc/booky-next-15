import React from 'react'
import ProductCard from './product-card'
import { Product } from '@/types'
import ViewAllProductsButton from '@/components/view-all-products-button'

const ProductList = ({
  data,
  title,
  limit,
  path,
}: {
  data: Product[]
  title?: string
  limit?: number
  path: string
}) => {
  const limitedData = limit ? data.slice(0, limit) : data

  return (
    <div className='mb-10 mt-17'>
      <div className='flex flex-col xs:flex-row mb-4'>
        <h2 className='font-medium text-xl lg:text-2xl mb-4 text-gray-700'>
          {title}
        </h2>
        <ViewAllProductsButton path={path} />
      </div>
      {data.length > 0 ? (
        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {limitedData.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p className='text-gray-400'>No products found</p>
        </div>
      )}
    </div>
  )
}

export default ProductList
