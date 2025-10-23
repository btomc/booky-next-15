'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Product } from '@/types'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import Image from 'next/image'

const ProductCarousel = ({ data }: { data: Product[] }) => {
  return (
    <Carousel
      className='w-full mb-12'
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 10000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((product: Product) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              <div className='relative mx-auto'>
                <Image
                  src={product.banner!}
                  alt={product.title}
                  height='0'
                  width='0'
                  sizes='100vw'
                  className='w-full h-auto'
                />
                {/* <div className='absolute inset-0 flex items-end justify-center'>
                  <h2 className='bg-gray-900 bg-opacity-50 text-2xl font-bold px-2 text-white'>
                    {product.title}
                  </h2>
                </div> */}
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='text-gray-50 cursor-pointer bg-slate-900/95 left-4 border-transparent h-9 w-9 sm:h-12 sm:w-12 hover:bg-primary-purple-dull transition-all' />
      <CarouselNext className='text-gray-50 cursor-pointer bg-slate-900/95 right-4 border-transparent h-9 w-9 sm:h-12 sm:w-12 hover:bg-primary-purple-dull transition-all' />
    </Carousel>
  )
}

export default ProductCarousel
