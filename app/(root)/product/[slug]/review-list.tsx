'use client'
import { Review } from '@/types'
import Link from 'next/link'
import { useState } from 'react'
import ReviewForm from './review-form'

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
  const reload = () => {
    console.log('Review Submitted')
  }

  return (
    <div className='space-y-4 p-6'>
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
      <div className='flex flex-col gap-3'>{/* REVIEWS HERE */}</div>
    </div>
  )
}

export default ReviewList
