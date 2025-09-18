import { cn } from '@/lib/utils'
import { CheckIcon } from 'lucide-react'
import React from 'react'

const CheckoutSteps = ({ current = 0 }) => {
  return (
    <div className='flex-between md:flex-row mb-10'>
      {['Login', 'Shipping', 'Payment', 'Place Order'].map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={cn(
              'p-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm shrink-0',
              index === current
                ? 'bg-primary-purple'
                : 'border border-primary-purple text-primary-purple',
              index === current - 1 ? 'bg-primary-purple' : ''
            )}
          >
            {index === current - 1 ? (
              <div className='p-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm'>
                <CheckIcon className='text-white' />
              </div>
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          <span className='hidden md:block'>{step}</span>
          {step !== 'Place Order' && (
            <hr className='w-16 border-t border-gray-300 mx-2' />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default CheckoutSteps
