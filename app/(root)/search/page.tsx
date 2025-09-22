import ProductCard from '@/components/shared/product/product-card'
import { Button } from '@/components/ui/button'
import { getAllProducts } from '@/lib/actions/product.actions'
import Image from 'next/image'
import Link from 'next/link'

const prices = [
  {
    name: '$1 - $10',
    value: '1-10',
  },
  {
    name: '$11 - $20',
    value: '11-20',
  },
  {
    name: '$21 - $30',
    value: '21-30',
  },
  {
    name: '$31 - $40',
    value: '31-40',
  },
  {
    name: '$41 - $50',
    value: '41-50',
  },
]

const ratings = [4, 3, 2, 1]

const sortOrders = ['newest', 'lowest', 'highest', 'rating']

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string
    category: string
    price: string
    rating: string
  }>
}) {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
  } = await props.searchParams

  const isQuerySet = q && q !== 'all' && q.trim() !== ''
  const isCategorySet = category && category !== 'all' && category.trim() !== ''
  const isPriceSet = price && price !== 'all' && price.trim() !== ''
  const isRatingSet = rating && rating !== 'all' && rating.trim() !== ''

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `
      Search ${isQuerySet ? q : ''} 
      ${isCategorySet ? `: Category ${category}` : ''}
      ${isPriceSet ? `: Price ${price}` : ''}
      ${isRatingSet ? `: Rating ${rating}` : ''}`,
    }
  } else {
    return {
      title: 'Search Products',
    }
  }
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string
    category?: string
    price?: string
    rating?: string
    sort?: string
    page?: string
  }>
}) => {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  } = await props.searchParams

  // Construct filter url
  const getFilterUrl = ({
    c,
    p,
    s,
    r,
    pg,
  }: {
    c?: string
    p?: string
    s?: string
    r?: string
    pg?: string
  }) => {
    const params = { q, category, price, rating, sort, page }

    if (c) params.category = c
    if (p) params.price = p
    if (s) params.sort = s
    if (r) params.rating = r
    if (pg) params.page = pg

    return `/search?${new URLSearchParams(params).toString()}`
  }

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  })

  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <div className='filter-links'>
        <div className='filter-links'>
          {/* Price Links */}
          <div className='text-xl mb-3 mt-4 text-gray-700 font-medium'>
            Price
          </div>
          <div>
            <ul className='space-y-2'>
              <li>
                <Link
                  className={`${price === 'all' && 'font-bold'} text-gray-700`}
                  href={getFilterUrl({ p: 'all' })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    className={`${
                      price === p.value && 'font-bold'
                    } text-gray-700`}
                    href={getFilterUrl({ p: p.value })}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Rating Links */}
          <div className='text-xl mb-2 mt-8 text-gray-700 font-medium'>
            Ratings
          </div>
          <div>
            <ul className='space-y-2'>
              <li>
                <Link
                  className={`${rating === 'all' && 'font-bold'} text-gray-700`}
                  href={getFilterUrl({ r: 'all' })}
                >
                  Any
                </Link>
              </li>
              {ratings.map((r) => (
                <li key={r}>
                  <Link
                    className={`${
                      rating === r.toString() && 'font-bold'
                    } text-gray-700 flex items-center`}
                    href={getFilterUrl({ r: `${r}` })}
                  >
                    {`${r}`}
                    <Image
                      src='/star.svg'
                      alt='star'
                      width={20}
                      height={20}
                      className='mb-1 ml-0.5 mr-2'
                    />{' '}
                    & up
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className='md:col-span-4 space-y-4'>
        <div className='flex-between flex-col md:flex-row my-4'>
          <div className='flex items-center text-gray-600'>
            {q !== 'all' && q !== '' && 'Query: ' + q}
            {category !== 'all' && category !== '' && 'Category: ' + category}
            {price !== 'all' && ' Price: ' + price + '$, '}
            <p className='ml-4'>
              {rating !== 'all' && (
                <span className='flex items-center'>
                  Rating: {rating}{' '}
                  <Image
                    src='/star.svg'
                    alt='star'
                    width={20}
                    height={20}
                    className='mb-0.5 ml-0.5 mr-1.5'
                  />
                  & up
                </span>
              )}
            </p>
            &nbsp;
            {(q !== 'all' && q !== '') ||
            (category !== 'all' && category !== '') ||
            rating !== 'all' ||
            price !== 'all' ? (
              <Button
                variant={'outline'}
                className='ml-4 text-gray-500 border-gray-300'
                asChild
              >
                <Link href='/search'>Clear</Link>
              </Button>
            ) : null}
          </div>
          <div className='text-gray-600'>
            Sort by{' '}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`mx-2 ${sort == s && 'font-bold'}`}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {products.data.length === 0 && (
            <div className='text-gray-600'>No products found</div>
          )}
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
