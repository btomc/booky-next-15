'use client'
import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0)

  return (
    <div className='space-y-4 border-gray-200'>
      <div className='w-full flex items-center justify-center border-gray-200'>
        <Image
          src={images[current]}
          alt='product image'
          width={250}
          height={300}
          className='min-h-[390px] h-[390px] object-cover object-center'
        />
      </div>
      <div className='flex my-6'>
        {images.map((image, index) => (
          <div
            key={image}
            onClick={() => setCurrent(index)}
            className={cn(
              'border-2 mr-2 cursor-pointer hover:border-primary-purple border-transparent',
              current === index && 'border-2 border-primary-purple'
            )}
          >
            <Image src={image} alt='image' width={50} height={50} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImages
