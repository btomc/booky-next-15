import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Banner = ({
  variant = 'long',
  className,
  src,
  srcMobile,
  path,
}: {
  variant: string
  src: string
  srcMobile: string
  path: string
  className?: string
}) => {
  if (variant === 'small') {
    return (
      <Link href={path} className='cursor-pointer'>
        <Image
          alt='banner'
          src={src}
          width={404}
          height={297}
          className={className}
        />
      </Link>
    )
  }

  return (
    <Link href={path} className='cursor-pointer'>
      <Image
        alt='banner'
        src={srcMobile}
        width={335}
        height={98}
        // className={className}
        className={cn('w-full md:hidden', className)}
      />
      <Image
        alt='banner'
        src={src}
        width={1281}
        height={240}
        // className={className}
        className={cn('hidden md:block', className)}
      />
    </Link>
  )
}

export default Banner
