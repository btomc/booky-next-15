import {
  homeIconsData,
  marketingBanners,
  marketingBannersSingleBook,
} from '@/assets/assets'
import Banner from '@/components/shared/product/banner'
import ProductCarousel from '@/components/shared/product/product-carousel'
import ProductList from '@/components/shared/product/product-list'
import ScrollUpButton from '@/components/shared/scroll-up-button'
import {
  getRecommendedProducts,
  getFeaturedProducts,
  getLatestProducts,
  getTopRatedProducts,
} from '@/lib/actions/product.actions'
import { Product } from '@/types'
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
      <Banner
        variant='long'
        src='/images/banner-long-5.png'
        srcMobile='/images/banner-long-5-mobile.png'
        path='/search?author=Michael+Connelly'
        className='mt-8 w-full'
      />
      <Banner
        variant='long'
        src='/images/banner-long-3.png'
        srcMobile='/images/banner-long-3-mobile.png'
        path='/product/away'
        className='mt-8 -mb-4'
      />
      <ProductList
        data={latestProducts}
        title='Newest Arrivals'
        limit={5}
        path={'sort=newest&page=1'}
      />
      <div className='grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 mt-10 gap-6 md:gap-4'>
        {marketingBanners.map((banner, index) => (
          <Banner
            key={index}
            src={banner.image}
            variant='small'
            className='w-full'
            path={banner.path}
            srcMobile=''
          />
        ))}
      </div>
      <ProductList
        data={recommendedProducts}
        title='Recommended'
        limit={5}
        path={'genre=all'}
      />
      <Banner
        variant='long'
        src='/images/banner-long-1.jpg'
        path='/product/west-of-wicked'
        srcMobile='/images/banner-long-1-mobile.png'
      />

      <ProductList
        data={topRatedProducts}
        title='Top Rated'
        limit={5}
        path={'rating=5'}
      />
      <Banner
        variant='long'
        src='/images/banner-long-2.png'
        path='/product/the-vanishing-cherry-blossom-bookshop'
        srcMobile='/images/banner-long-2-mobile.png'
      />

      <div className='grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 mt-10 gap-6 md:gap-4'>
        {marketingBannersSingleBook.map((banner, index) => (
          <Banner
            key={index}
            src={banner.image}
            variant='small'
            className='w-full'
            path={banner.path}
            srcMobile=''
          />
        ))}
      </div>

      <div className='flex w-full justify-end xxl:relative mt-8'>
        <ScrollUpButton />
      </div>
    </>
  )
}

export default Homepage
