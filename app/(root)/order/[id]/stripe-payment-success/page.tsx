import { Button } from '@/components/ui/button'
import { getOrderById } from '@/lib/actions/order.actions'
import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const SuccessPage = async (props: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ payment_intent: string }>
}) => {
  const { id } = await props.params
  const { payment_intent: paymentIntentId } = await props.searchParams

  // Fetch order
  const order = await getOrderById(id)
  if (!order) notFound()

  // Retrieve payment intent
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

  // Check if payment intent is valid
  if (
    paymentIntent.metadata.orderId == null ||
    paymentIntent.metadata.orderId !== order.id.toString()
  ) {
    return notFound()
  }

  // Check if payment is successful
  const isSuccess = paymentIntent.status === 'succeeded'

  if (!isSuccess) return redirect(`/order/${id}`)

  return (
    <div className='max-w-4xl w-full mx-auto space-y-8'>
      <div className='flex flex-col gap-6 items-center'>
        <div className='rounded-full p-4 bg-primary-purple/15 mt-6 flex items-center justify-center'>
          <CheckIcon className='size-10 text-primary-purple' />
        </div>
        <h1 className='h1-bold text-gray-700 mt-4'>Thanks for your purchase</h1>
        <div className='text-gray-600'>We are processing your order.</div>
        <Button asChild variant='purple'>
          <Link href={`/order/${id}`}>View Order</Link>
        </Button>
      </div>
    </div>
  )
}

export default SuccessPage
