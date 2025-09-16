'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUpDefaultValues } from '@/lib/constants'
import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { signUpUser } from '@/lib/actions/user.actions'
import { useSearchParams } from 'next/navigation'

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const SignUpButton = () => {
    const { pending } = useFormStatus()

    return (
      <Button
        disabled={pending}
        className='w-full cursor-pointer'
        variant='purple'
        size='lg'
      >
        {pending ? 'Submitting...' : 'Sign Up'}
      </Button>
    )
  }

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='email' className='text-gray-600 my-2'>
            Name
          </Label>
          <Input
            id='name'
            name='name'
            type='text'
            autoComplete='name'
            className='rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
            defaultValue={signUpDefaultValues.name}
          />
        </div>
        <div>
          <Label htmlFor='email' className='text-gray-600 my-2'>
            Email
          </Label>
          <Input
            id='email'
            name='email'
            type='text'
            autoComplete='email'
            className='rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
            defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='password' className='text-gray-600 my-2'>
            Password
          </Label>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='password'
            className='rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
            defaultValue={signUpDefaultValues.password}
          />
        </div>
        <div>
          <Label htmlFor='confirmPassword' className='text-gray-600 my-2'>
            Confirm Password
          </Label>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            required
            autoComplete='confirmPassword'
            className='rounded border-2 border-solid border-gray-200 focus-visible:ring-primary-purple/70'
            defaultValue={signUpDefaultValues.confirmPassword}
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {data && !data.success && (
          <div className='text-center text-red-600'>{data.message}</div>
        )}

        <div className='text-sm text-center text-muted-foreground'>
          Already have an account?{' '}
          <Link
            href='/sign-in'
            target='_self'
            className='underline text-primary-purple-dull'
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignUpForm
