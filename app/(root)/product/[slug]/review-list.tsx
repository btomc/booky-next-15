'use client'
import { Review } from '@/types'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ReviewForm from './review-form'
import { getReviews } from '@/lib/actions/review.actions'
import { Calendar, User } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import Image from 'next/image'
import Rating from '@/components/shared/product/rating'

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string
  productId: string
  productSlug: string
}) => {
  const [reviews, setReviews] = useState<Review[]>([])

  //   console.log(userId, productId, productSlug)
  useEffect(() => {
    const loadReviews = async () => {
      const res = await getReviews({ productId })
      setReviews(res.data)
    }

    loadReviews()
  }, [productId])

  // Reload reviews after created or updated
  const reload = async () => {
    const res = await getReviews({ productId })
    setReviews([...res.data])
  }

  return (
    <div className='space-y-4 py-6'>
      {reviews.length === 0 && (
        <div className='text-gray-600 mb-6'>No reviews yet</div>
      )}
      {userId ? (
        <ReviewForm
          userId={userId}
          productId={productId}
          onReviewSubmitted={reload}
        />
      ) : (
        <div className='text-gray-700'>
          Please
          <Link
            className='text-primary-purple border-b border-primary-purple mx-2'
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>
          to write a review
        </div>
      )}
      <div className='flex flex-col gap-3'>
        {reviews.map((review) => (
          <Card
            key={review.id}
            className='shadow-none border-0 border-b border-gray-200 rounded-none text-left mx-0 px0'
          >
            <CardHeader className='px-0'>
              <div className='flex flex-col space-y-4 text-sm text-gray-700'>
                <div className='flex items-center'>
                  <Image
                    src='/user.svg'
                    alt='user'
                    width={20}
                    height={20}
                    className='mr-1.5'
                  />
                  {review.user ? review.user.name : 'User'}
                </div>
                <Rating value={review.rating} />
                <div className='flex items-center mt-5'>
                  <Calendar className='mr-2 h-5 w-5' />
                  {formatDateTime(review.createdAt).dateOnly}
                </div>
              </div>
            </CardHeader>

            <CardContent className='text-gray-600 px-0'>
              <CardDescription>{review.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ReviewList
