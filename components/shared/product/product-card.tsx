import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Product } from '@/types'
import ProductPrice from './product-price'

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className='w-full max-w-[250px] border-transparent'>
      <CardHeader className='p-0 flex items-center justify-center'>
        <Link
          href={`/product/${product.slug}`}
          className='h-[235px] w-[160px] relative'
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className='p-4 pb-0 grid'>
        <Link href={`/product/${product.slug}`} className='max-w-[185px]'>
          <h2 className='text-base font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>
            {product.title}
          </h2>
        </Link>
        <h3 className='text-sm'>{product.author}</h3>
        <div className='flex justify-between py-5'>
          <div className='font-semibold text-lg'>
            <ProductPrice value={Number(product.price)} />
          </div>

          <p className='flex items-center justify-center'>
            {Number(product.rating)}
            {Number(product.rating) > 0 ? (
              <Image
                src='/star.svg'
                alt='star'
                width={20}
                height={20}
                className='mb-[3px] ml-0.5'
              />
            ) : (
              <Image
                src='/star-gray.svg'
                alt='star'
                width={20}
                height={20}
                className='mb-0.5 ml-0.5'
              />
            )}{' '}
          </p>
        </div>
        {product.stock > 0 ? (
          <Button variant='purple' size='lg' className='cursor-pointer'>
            Add to Cart
          </Button>
        ) : (
          <Button
            variant='outline'
            size='lg'
            className='cursor-pointer text-primary-purple'
          >
            Unavailable
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default ProductCard
