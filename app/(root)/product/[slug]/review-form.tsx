'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  createUpdateReview,
  getReviewByProductId,
} from '@/lib/actions/review.actions'
import { reviewFormDefaultValues } from '@/lib/constants'
import { insertReviewSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { PencilLineIcon } from 'lucide-react'

const ReviewForm = ({
  userId,
  productId,
  onReviewSubmitted,
}: {
  userId: string
  productId: string
  onReviewSubmitted: () => void
}) => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof insertReviewSchema>>({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: reviewFormDefaultValues,
  })

  const handleOpenForm = async () => {
    form.setValue('productId', productId)
    form.setValue('userId', userId)

    const review = await getReviewByProductId({ productId })

    if (review) {
      form.setValue('description', review.description)
      form.setValue('rating', review.rating)
    }

    setOpen(true)
  }

  // Submit Form Handler
  const onSubmit: SubmitHandler<z.infer<typeof insertReviewSchema>> = async (
    values
  ) => {
    const res = await createUpdateReview({ ...values, productId })

    if (!res.success) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }

    onReviewSubmitted()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={handleOpenForm}
        variant='outlinePurple'
        className='cursor-pointer flex items-center'
      >
        Write a Review <PencilLineIcon className='ml-0.5' />
      </Button>
      <DialogContent className='sm:max-w-[425px] bg-white border-gray-200'>
        <Form {...form}>
          <form method='post' onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className='mb-2 font-medium text-gray-700'>
                Write a Review
              </DialogTitle>
              <DialogDescription className='text-sm text-gray-600'>
                Share your thoughts with other customers
              </DialogDescription>
            </DialogHeader>

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
                            <SelectItem
                              key={index}
                              value={(index + 1).toString()}
                            >
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
            <DialogFooter className='flex items-end w-full'>
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
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewForm
