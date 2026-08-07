import shield_icon from './shield.svg'
import tag_icon from './tag.svg'
import truck_icon from './truck.svg'
import book_icon from './book.svg'

export const assets = {
  book_icon,
  tag_icon,
  shield_icon,
  truck_icon,
}

export const productDetailsData = [
  { href: '#plot', label: 'Plot' },
  { href: '#details', label: 'Details' },
  { href: '#rating', label: 'Rating' },
  { href: '#author', label: 'Other Books of the Author' },
  { href: '#related', label: 'Related Books' },
]

export const homeIconsData = [
  { icon: truck_icon, label: 'Free delivery from $99,99' },
  { icon: tag_icon, label: 'Discounts up to 45% non-stop' },
  { icon: book_icon, label: 'Over 100,000 products' },
  { icon: shield_icon, label: 'Safe shopping' },
]

export const marketingBannersSingleBook = [
  { image: '/images/banner-small-1.png', path: '/product/forbidden-mountain' },
  {
    image: '/images/banner-small-2.png',
    path: '/product/the-one-and-only-family',
  },
  {
    image: '/images/banner-small-3aa.png',
    path: '/product/the-lighthouse-at-the-world-end',
  },
]

export const marketingBanners = [
  { image: '/images/banner-small-4.png', path: '/search?q=all&genre=romance' },
  {
    image: '/images/banner-small-5.png',
    path: '/search?q=all&age=teenagers',
  },
  { image: '/images/banner-small-6.png', path: '/search?q=all&age=children' },
]
