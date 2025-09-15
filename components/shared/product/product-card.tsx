import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const ProductCard = ({ product }: { product: any }) => {
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
          <p className='font-semibold text-lg'>${product.price}</p>

          <p className='flex'>
            {product.rating}{' '}
            <Image
              src='/star.svg'
              alt='star'
              width={20}
              height={20}
              className='mb-1.5 ml-0.5'
            />
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
