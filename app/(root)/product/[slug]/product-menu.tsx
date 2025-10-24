'use client'

import { productDetailsData } from '@/assets/assets'
import Link from 'next/link'
import { useState } from 'react'

const ProductMenu = () => {
  const [activeItem, setActiveItem] = useState('')

  return (
    <div className='hidden md:flex gap-10 text-gray-800 font-[500] mb-10 sticky top-0 z-50 bg-white pt-4'>
      {productDetailsData.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={` ${
            activeItem === item.href
              ? 'border-b-3 border-primary-purple pb-3'
              : 'border-b-3 border-transparent pb-3'
          }`}
          onClick={() => {
            setActiveItem(item.href)
          }}
        >
          {item.label}{' '}
        </Link>
      ))}
    </div>
  )
}

export default ProductMenu
