import AddToCart from '@/components/shared/product/add-to-cart'
import ProductImages from '@/components/shared/product/product-images'
import ProductPrice from '@/components/shared/product/product-price'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getMyCart } from '@/lib/actions/cart.actions'
import { getProductBySlug } from '@/lib/actions/product.actions'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReviewList from './review-list'
import { auth } from '@/auth'

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await props.params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const session = await auth()
  const userId = session?.user?.id

  const cart = await getMyCart()

  return (
    <>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-5 pb-4'>
          {/* Images column */}
          <div className='col-span-2'>
            <ProductImages images={product.images} />
          </div>
          {/* Details column */}
          <div className='col-span-2 p-5'>
            <div className='flex flex-col gap-3'>
              <p className='text-2xl font-semibold text-gray-700'>
                {product.title}
              </p>
              <p className='text-gray-600'>{product.author}</p>
              <Link href='#rating'>
                {Number(product.rating)} ({product.numReviews})
              </Link>
            </div>
          </div>

          {/* Action column */}
          <div>
            <Card className='border-gray-200 shadow-none min-w-[195px]'>
              <CardContent className='p-4'>
                <div className='mb-6'>
                  <div className='text-2xl font-semibold text-gray-700'>
                    {/* ${Number(product.price)} */}
                    <ProductPrice
                      value={Number(product.price)}
                      className='text-3xl'
                    />
                  </div>
                </div>

                <div className='mb-2 flex justify-between'>
                  <p>Status</p>
                  {product.stock > 0 ? (
                    <p className='text-navy'>In stock</p>
                  ) : (
                    <p className='text-red-600'>Unavailable</p>
                  )}
                </div>
                <div className='mt-10'>
                  {product.stock > 0 ? (
                    <AddToCart
                      cart={cart}
                      item={{
                        productId: product.id,
                        title: product.title,
                        author: product.author,
                        slug: product.slug,
                        price: product.price,
                        qty: 1,
                        image: product.images![0],
                      }}
                    />
                  ) : (
                    <Button
                      variant='outline'
                      size='xl'
                      className='cursor-pointer text-primary-purple w-full'
                    >
                      Unavailable
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className='mt-10'>
        <div className='hidden md:flex  gap-10 text-gray-800 font-[500] mb-14'>
          <Link href='#plot'>Plot</Link>
          <Link href='#details'>Details</Link>
          <Link href='#rating'>Rating</Link>
          <Link href='#author'>Other Books of the Author</Link>
          <Link href='#related'>Related Books</Link>
        </div>
        <div className='flex flex-col border-b border-gray-200' id='plot'>
          <p className='text-2xl font-semibold text-gray-700'>Plot</p>
          <p className='text-sm pt-6 pb-10 leading-6'>{product.plot}</p>
        </div>
        {/* Specific Details  */}
        <div
          className='flex flex-col border-b border-gray-200 py-6'
          id='details'
        >
          <p className='text-2xl font-semibold text-gray-700'>Details</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 pt-6'>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-10'>
                <p className='w-40 sm:w-20'>Title </p>
                <p className='font-[500]'>{product.title}</p>
              </div>
              <div className='flex gap-10'>
                <p className='w-40 sm:w-20'>Author </p>
                <p className='font-[500]'>{product.author}</p>
              </div>
              <div className='flex gap-10'>
                <p className='w-40 sm:w-20'>Genres </p>
                <p className='font-[500]'>{product.genres.join(', ')}</p>
              </div>
            </div>
            <div className='flex flex-col gap-3 mt-3 sm:m-0'>
              <div className='flex gap-10'>
                <p className='w-40'>Publication Date </p>
                <p className='font-[500]'>{product.publicationDate}</p>
              </div>
              <div className='flex gap-10'>
                <p className='w-40'>Biding </p>
                <p className='font-[500]'>{product.binding}</p>
              </div>
              <div className='flex gap-10'>
                <p className='w-40'>Pages </p>
                <p className='font-[500]'>{product.pages}</p>
              </div>
              <div className='flex gap-10'>
                <p className='w-40'>Language </p>
                <p className='font-[500]'>{product.language}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div
          className='flex flex-col border-b border-gray-200 py-6'
          id='rating'
        >
          <p className='text-2xl font-semibold text-gray-700'>Rating</p>
          <div className='flex flex-col lg:flex-row py-8'>
            <div className='border border-gray-200 w-[250px]'>
              <p className='text-3xl font-[500] text-gray-700 pt-6 border-b border-gray-200 mx-6 mb-2 pb-4'>
                Reviews
              </p>

              <div className='flex flex-col py-4 px-6'>
                <div className='flex items-center justify-center'>
                  <div className='flex justify-center items-center mr-4 pl-6'>
                    <span>5</span>
                    <Image
                      src='/star.svg'
                      alt='star'
                      width={20}
                      height={20}
                      className='mb-1 ml-2.5'
                    />
                  </div>
                  <div>
                    <div className='border-2 border-gray-200 w-32' />
                  </div>
                  <div className='mx-4 my-1'>0</div>
                </div>

                <div className='flex items-center justify-center'>
                  <div className='flex justify-center items-center mr-4 pl-6'>
                    4{' '}
                    <Image
                      src='/star.svg'
                      alt='star'
                      width={20}
                      height={20}
                      className='mb-1 ml-2.5'
                    />
                  </div>
                  <div>
                    <div className='border-2 border-gray-200 w-32' />
                  </div>
                  <div className='mx-4 my-1'>0</div>
                </div>

                <div className='flex items-center justify-center'>
                  <div className='flex justify-center items-center mr-4 pl-6'>
                    3{' '}
                    <Image
                      src='/star.svg'
                      alt='star'
                      width={20}
                      height={20}
                      className='mb-1 ml-2.5'
                    />
                  </div>
                  <div>
                    <div className='border-2 border-gray-200 w-32' />
                  </div>
                  <div className='mx-4 my-1'>0</div>
                </div>

                <div className='flex items-center justify-center'>
                  <div className='flex justify-center items-center mr-4 pl-6'>
                    2{' '}
                    <Image
                      src='/star.svg'
                      alt='star'
                      width={20}
                      height={20}
                      className='mb-1 ml-2.5'
                    />
                  </div>
                  <div>
                    <div className='border-2 border-gray-200 w-32' />
                  </div>
                  <div className='mx-4 my-1'>0</div>
                </div>
                <div className='flex items-center justify-center'>
                  <div className='flex justify-center items-center mr-4 pl-6'>
                    <span className='mr-0.5'>1</span>
                    <Image
                      src='/star.svg'
                      alt='star'
                      width={20}
                      height={20}
                      className='mb-1 ml-2.5'
                    />
                  </div>
                  <div>
                    <div className='border-2 border-gray-200 w-32' />
                  </div>
                  <div className='mx-4 my-1'>0</div>
                </div>
              </div>
            </div>
            <div className='w-full lg:min-w-[650px] lg:max-w-[730px]'>
              <ReviewList
                userId={userId || ''}
                productId={product.id}
                productSlug={product.slug}
              />
            </div>
          </div>
        </div>

        {/* Other Books of the Author */}
        <div
          className='flex flex-col border-b border-gray-200 py-6'
          id='author'
        >
          <p className='text-2xl font-semibold text-gray-700'>
            Other Books of the Author
          </p>
        </div>

        {/* Related Books */}
        <div className='flex flex-col py-6' id='related'>
          <p className='text-2xl font-semibold text-gray-700'>Related Books</p>
        </div>
      </section>
    </>
  )
}

export default ProductDetailsPage
