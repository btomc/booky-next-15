import Image from 'next/image'
import Link from 'next/link'

import ProductCard from '@/components/shared/product/product-card'
import { Button } from '@/components/ui/button'

import {
  getAllAges,
  getAllAuthors,
  getAllGenres,
  getAllProducts,
} from '@/lib/actions/product.actions'
import Pagination from '@/components/shared/pagination'

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

const ratings = [5, 4, 3, 2, 1]

const sortOrders = ['newest', 'lowest', 'highest', 'rating']

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string
    genre: string
    price: string
    rating: string
    author: string
    age: string
  }>
}) {
  const {
    q = 'all',
    genre = 'all',
    price = 'all',
    rating = 'all',
    author = 'all',
    age = 'all',
  } = await props.searchParams

  const isQuerySet = q && q !== 'all' && q.trim() !== ''
  const isGenreSet = genre && genre !== 'all' && genre.trim() !== ''
  const isAgeSet = age && age !== 'all' && age.trim() !== ''
  const isAuthorSet = author && author !== 'all' && author.trim() !== ''
  const isPriceSet = price && price !== 'all' && price.trim() !== ''
  const isRatingSet = rating && rating !== 'all' && rating.trim() !== ''

  if (
    isQuerySet ||
    isGenreSet ||
    isAgeSet ||
    isAuthorSet ||
    isPriceSet ||
    isRatingSet
  ) {
    return {
      title: `
      Search ${isQuerySet ? q : ''} 
      ${isGenreSet ? `: Genre ${genre}` : ''}
      ${isAgeSet ? `: Age ${age}` : ''}
      ${isAuthorSet ? `: Author ${author}` : ''}
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
    genre?: string
    age?: string
    author?: string
    price?: string
    rating?: string
    sort?: string
    page?: string
  }>
}) => {
  const {
    q = 'all',
    genre = 'all',
    age = 'all',
    author = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  } = await props.searchParams

  // Construct filter url
  const getFilterUrl = ({
    g,
    a,
    ag,
    p,
    s,
    r,
    pg,
  }: {
    g?: string
    a?: string
    ag?: string
    p?: string
    s?: string
    r?: string
    pg?: string
  }) => {
    const params = { q, genre, age, author, price, rating, sort, page }

    if (g) params.genre = g
    if (ag) params.age = ag
    if (a) params.author = a
    if (p) params.price = p
    if (s) params.sort = s
    if (r) params.rating = r
    if (pg) params.page = pg

    return `/search?${new URLSearchParams(params).toString()}`
  }

  const products = await getAllProducts({
    query: q,
    genre,
    age,
    author,
    price,
    rating,
    sort,
    page: Number(page),
  })

  const genres = await getAllGenres()
  const authors = await getAllAuthors()
  const ages = await getAllAges()

  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <div className='filter-links'>
        <div className='filter-links mb-6'>
          {/* Genre Links */}
          <div className='text-xl mb-2 mt-3 text-gray-700 font-medium'>
            Genre
          </div>
          <div>
            <ul className='space-y-1'>
              <li>
                <Link
                  className={`${
                    (genre === 'all' || genre === '') && 'font-bold'
                  } text-gray-700`}
                  href={getFilterUrl({ g: 'all' })}
                >
                  All
                </Link>
              </li>
              {genres.map((x) => (
                <li key={x.genre}>
                  <Link
                    className={`${
                      genre === x.genre && 'font-bold'
                    } text-gray-700 text-sm`}
                    href={getFilterUrl({ g: x.genre })}
                  >
                    {x.genre} ({x._count})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Author Links */}
          <div className='text-xl mb-2 mt-8 text-gray-700 font-medium'>
            Author
          </div>
          <div>
            <ul className='space-y-1'>
              <li>
                <Link
                  className={`${
                    (author === 'all' || author === '') && 'font-bold'
                  } text-gray-700`}
                  href={getFilterUrl({ a: 'all' })}
                >
                  All
                </Link>
              </li>
              {authors.map((x) => (
                <li key={x.author}>
                  <Link
                    className={`${
                      author === x.author && 'font-bold'
                    } text-gray-700 text-sm`}
                    href={getFilterUrl({ a: x.author })}
                  >
                    {x.author} ({x._count})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Age Links */}
          <div className='text-xl mb-2 mt-8 text-gray-700 font-medium'>Age</div>
          <div>
            <ul className='space-y-1'>
              <li>
                <Link
                  className={`${
                    (age === 'all' || age === '') && 'font-bold'
                  } text-gray-700`}
                  href={getFilterUrl({ ag: 'all' })}
                >
                  All
                </Link>
              </li>
              {ages.map((x) => (
                <li key={x.age}>
                  <Link
                    className={`${
                      age === x.age && 'font-bold'
                    } text-gray-700 text-sm`}
                    href={getFilterUrl({ ag: x.age })}
                  >
                    {x.age} ({x._count})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Price Links */}
          <div className='text-xl mb-3 mt-8 text-gray-700 font-medium'>
            Price
          </div>
          <div>
            <ul className='space-y-2'>
              <li>
                <Link
                  className={`${price === 'all' && 'font-bold'} text-gray-700`}
                  href={getFilterUrl({ p: 'all' })}
                >
                  All
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    className={`${
                      price === p.value && 'font-bold'
                    } text-gray-700 text-sm`}
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
                  All
                </Link>
              </li>
              {ratings.map((r) => (
                <li key={r}>
                  <Link
                    className={`${
                      rating === r.toString() && 'font-bold'
                    } text-gray-700 flex items-center text-sm`}
                    href={getFilterUrl({ r: `${r}` })}
                  >
                    {`${r}`}
                    <Image
                      src='/star.svg'
                      alt='star'
                      width={20}
                      height={20}
                      className='mb-0.5 ml-0.5 mr-2'
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
          <div className='flex items-center text-gray-600 flex-wrap'>
            {q !== 'all' && q !== '' && 'Query: ' + q + '; '}
            {genre !== 'all' && genre !== '' && 'Genre: ' + genre + '; '}
            {age !== 'all' && age !== '' && 'Age: ' + age + '; '}
            {author !== 'all' && author !== '' && 'Author: ' + author + '; '}
            {price !== 'all' && ' Price: ' + price + '$, '}
            <p className='ml-4'>
              {rating !== 'all' && (
                <span className='flex items-center'>
                  {rating}{' '}
                  <Image
                    src='/star.svg'
                    alt='star'
                    width={20}
                    height={20}
                    className='mb-0.5 ml-0.5 mr-1.5'
                  />
                </span>
              )}
            </p>
            &nbsp;
            {(q !== 'all' && q !== '') ||
            (genre !== 'all' && genre !== '') ||
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
        </div>
        <div className='flex flex-col sm:flex-row justify-between items-center'>
          <div className='text-gray-600'>
            <p> Sort by </p>
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`mr-3 ${sort == s && 'font-bold'}`}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
          <div className='flex w-full justify-center sm:justify-end'>
            {products.totalPages > 1 && (
              <Pagination
                page={Number(page || 1)}
                totalPages={products?.totalPages}
              />
            )}
          </div>
        </div>
        <div className='grid grid-cols-1 gap-8 gap-x-18 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {products.data.length === 0 && (
            <div className='col-span-3 mt-3 text-gray-700'>
              No products found
            </div>
          )}
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className='flex w-full justify-center sm:justify-end'>
          {products.totalPages > 1 && products.data.length !== 0 && (
            <Pagination
              page={Number(page || 1)}
              totalPages={products?.totalPages}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
