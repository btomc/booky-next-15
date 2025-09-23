'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { reviewFormDefaultValues } from '@/lib/constants'
import { insertReviewSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ReviewForm = ({
  userId,
  productId,
  onReviewSubmitted,
}: {
  userId: string
  productId: string
  onReviewSubmitted?: () => void
}) => {
  const form = useForm<z.infer<typeof insertReviewSchema>>({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: reviewFormDefaultValues,
  })

  const handleOpenForm = () => {}

  return (
    <Form {...form}>
      <form method='post'>
        <h2 className='mb-2 font-medium text-gray-700'>Write a Review</h2>
        <p className='text-sm text-gray-600'>
          Share your thoughts with other customers
        </p>

        <div className='grid gap-4 py-4'>
          <FormField
            control={form.control}
            name='rating'
            render={({ field }) => {
              return (
                <FormItem className='flex text-gray-600 pt-2'>
                  <FormLabel className='text-gray-700'>Rating:</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className='border-gray-300 cursor-pointer focus-visible:ring-primary-purple/70'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-white border-gray-200 text-gray-700'>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <SelectItem key={index} value={(index + 1).toString()}>
                          {index + 1}{' '}
                          <Image
                            src='/star.svg'
                            alt='star'
                            width={20}
                            height={20}
                            className='mb-0.5'
                          />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder='Write your review'
                      {...field}
                      className='rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
                    />
                  </FormControl>
                </FormItem>
              )
            }}
          />
        </div>
        <div className='flex items-end w-full'>
          <div className='w-full' />
          <Button
            type='submit'
            size='lg'
            variant='purple'
            className='cursor-pointer'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ReviewForm
