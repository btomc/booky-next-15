import Image from 'next/image'
import Link from 'next/link'

const Banner = ({
  variant = 'long',
  className,
  src,
  path,
}: {
  variant: string
  src: string
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
        src={src}
        width={1281}
        height={240}
        className={className}
      />
    </Link>
  )
}

export default Banner
