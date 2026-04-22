import AddToCart from '@/components/shared/product/add-to-cart'
import ProductImages from '@/components/shared/product/product-images'
import ProductPrice from '@/components/shared/product/product-price'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getMyCart } from '@/lib/actions/cart.actions'
import { getProductBySlug } from '@/lib/actions/product.actions'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReviewList from './review-list'
import { auth } from '@/auth'
import Rating from '@/components/shared/product/rating'
import ProductsByAuthor from './product-by-author'
import RelatedProducts from './related-products'
import { HomeIcon, PackageIcon, TruckIcon } from 'lucide-react'
import ProductMenu from './product-menu'
import ScrollUpButton from '@/components/shared/scroll-up-button'
import Image from 'next/image'

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await props.params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const session = await auth()
  const userId = session?.user?.id

  const cart = await getMyCart()
  // console.log(product)

  return (
    <>
      <section>
        <Breadcrumb className='mb-9 mt-1 text-gray-700'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/' className='flex items-center'>
                  <HomeIcon className='size-4' />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/search?q=all&`}>Books</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/search?q=all&genre=${product.genre}`}>
                  {product.genre}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-4'>
          {/* Images column */}
          <div className='col-span-1'>
            <ProductImages images={product.images} />
          </div>
          {/* Details column */}
          <div className='col-span-1 xl:col-span-2 p-5'>
            <div className='flex flex-col gap-3'>
              <p className='text-2xl font-semibold text-gray-700'>
                {product.title}
              </p>
              <p className='text-gray-600'>{product.author}</p>
              <Link href='#rating' className='flex items-center text-gray-700'>
                <Rating value={Number(product.rating)} />
                <span className='ml-1 mt-1'>({product.numReviews})</span>
              </Link>
            </div>
          </div>

          {/* Action column */}
          <div className='md:col-span-2 lg:col-span-1'>
            <Card className='border-gray-200 bg-gray-50/50 shadow-none min-w-[195px]'>
              <CardContent className='pt-4 px-4'>
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
                    <p className='text-gray-600'>In stock</p>
                  ) : (
                    <p className='text-red-600'>Unavailable</p>
                  )}
                </div>
                <div className='my-6 '>
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
                <div className='text-gray-700 flex flex-col items-center mt-4 text-sm font-medium'>
                  <p className='flex items-center py-4'>
                    <TruckIcon className='mr-2 text-gray-600' /> Free delivery
                    over $99.99
                  </p>
                  <p className='border-t border-gray-200 flex items-center pt-4'>
                    <PackageIcon className='mr-2 text-gray-600' /> Shipping
                    costs from $9.99
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className='mt-10'>
        <ProductMenu />
        <div className='flex flex-col border-b border-gray-200' id='plot'>
          <p className='text-2xl font-medium text-gray-700 mt-6'>Plot</p>
          <p className='text-sm pt-6 pb-10 leading-6'>{product.plot}</p>
        </div>
        {/* Specific Details  */}
        <div
          className='flex flex-col border-b border-gray-200 py-6'
          id='details'
        >
          <p className='text-2xl font-medium text-gray-700'>Details</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 pt-6'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col xs:flex-row xs:gap-10'>
                <p className='w-40 sm:w-20 text-gray-600 mb-1 xs:mb-0'>
                  Title{' '}
                </p>
                <p className='font-[500]'>{product.title}</p>
              </div>
              <div className='flex flex-col xs:flex-row xs:gap-10'>
                <p className='w-40 sm:w-20 text-gray-600 mb-1 xs:mb-0'>
                  Author{' '}
                </p>
                <p className='font-[500]'>{product.author}</p>
              </div>
              <div className='flex flex-col xs:flex-row xs:gap-10'>
                <p className='w-40 sm:w-20 text-gray-600 mb-1 xs:mb-0'>
                  Genre{' '}
                </p>
                <p className='font-[500]'>{product.genre}</p>
              </div>
              <div className='flex flex-col xs:flex-row xs:gap-10'>
                <p className='w-40 sm:w-20 text-gray-600 mb-1 xs:mb-0'>Age </p>
                <p className='font-[500]'>{product.age}</p>
              </div>
            </div>
            <div className='flex flex-col gap-3 mt-3 sm:m-0'>
              <div className='flex flex-col xs:flex-row xs:gap-10'>
                <p className='w-40 text-gray-600 mb-1 xs:mb-0'>
                  Publication Date{' '}
                </p>
                <p className='font-[500]'>{product.publicationDate}</p>
              </div>
              <div className='flex flex-col xs:flex-row xs:gap-10'>
                <p className='w-40 text-gray-600 mb-1 xs:mb-0'>Biding </p>
                <p className='font-[500]'>{product.binding}</p>
              </div>
              <div className='flex flex-col xs:flex-row xs:gap-10'>
                <p className='w-40 text-gray-600 mb-1 xs:mb-0'>Pages </p>
                <p className='font-[500]'>{product.pages}</p>
              </div>
              <div className='flex flex-col xs:flex-row xs:gap-10'>
                <p className='w-40 text-gray-600 mb-1 xs:mb-0'>Language </p>
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
          <p className='text-2xl font-medium text-gray-700'>Rating</p>
          <div className='flex flex-col lg:flex-row py-8'>
            <div className='flex flex-col mb-6 lg:mb-0'>
              <div className='border border-gray-200 text-gray-600 rounded-lg px-18 py-5 flex flex-col mr-8 justify-center items-center h-[118px] w-[236px]'>
                {Number(product.rating) === 0 ? (
                  <div className='flex justify-center items-center'>
                    <p className='text-3xl font-semibold'>-</p>
                  </div>
                ) : (
                  <div className='flex items-center justify-center'>
                    <p className='text-5xl md:text-6xl font-medium'>
                      {Number(product.rating)}
                    </p>
                    <Image
                      src='/star.svg'
                      alt='star'
                      width={50}
                      height={50}
                      className='mb-[4px] ml-0.5'
                    />
                  </div>
                )}
                <span className='text-gray-500 text-xs mt-2'>
                  {product.numReviews} reviews
                </span>
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
          className='flex flex-col border-b border-gray-200 -mt-4'
          id='author'
        >
          <ProductsByAuthor
            author={product.author}
            currentProductId={product.id}
          />
        </div>
        {/* Related Books */}
        <div className='flex flex-col pb-6' id='related'>
          <RelatedProducts
            genre={product.genre}
            currentProductId={product.id}
          />
        </div>
        <div className='flex w-full justify-end xxl:relative'>
          <ScrollUpButton />
        </div>
      </section>
    </>
  )
}

export default ProductDetailsPage
