import ProductCard from '@/components/shared/product/product-card'
import { getAllProducts } from '@/lib/actions/product.actions'
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
        </div>
      </div>
      <div className='md:col-span-4 space-y-4'>
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
