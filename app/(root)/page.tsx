import { homeIconsData } from '@/assets/assets'
import ProductCarousel from '@/components/shared/product/product-carousel'
import ProductList from '@/components/shared/product/product-list'
import ScrollUpButton from '@/components/shared/scroll-up-button'
import {
  getRecommendedProducts,
  getFeaturedProducts,
  getLatestProducts,
  getTopRatedProducts,
} from '@/lib/actions/product.actions'
import Image from 'next/image'

const Homepage = async () => {
  const latestProducts = await getLatestProducts()
  const featuredProducts = await getFeaturedProducts()
  const recommendedProducts = await getRecommendedProducts()
  const topRatedProducts = await getTopRatedProducts()

  // console.log(topRatedProducts)

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <div className='flex gap-14 justify-start md:justify-evenly xl:justify-between flex-wrap'>
        {homeIconsData.map((item, index) => (
          <div key={index} className='flex items-center gap-4 shrink-0'>
            <span className='bg-primary-purple/20 rounded-full p-2 xs:p-3 flex items-center justify-center shrink-0'>
              <Image src={item.icon} alt='' className='size-5 xs:size-7' />
            </span>
            <p className='text-gray-700 text-xs xs:text-sm font-medium'>
              {item.label}
            </p>
          </div>
        ))}
      </div>
      <ProductList data={latestProducts} title='Newest Arrivals' limit={5} />
      <ProductList data={recommendedProducts} title='Recommended' limit={5} />
      <ProductList data={topRatedProducts} title='Top Rated' limit={5} />
      <div className='flex w-full justify-end xxl:relative'>
        <ScrollUpButton />
      </div>
    </>
  )
}

export default Homepage
