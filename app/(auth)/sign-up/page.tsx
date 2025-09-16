import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constants'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import SignUpForm from './sign-up-form'

export const metadata: Metadata = {
  title: 'Sign Up',
}

const SignUpPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string
  }>
}) => {
  const { callbackUrl } = await props.searchParams

  const session = await auth()

  if (session) {
    return redirect(callbackUrl || '/')
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <Card className='border-gray-200'>
        <CardHeader className='space-y-4 pt-8'>
          <Link href='/' className='flex-center'>
            <Image
              src='/booky-logo.svg'
              width={60}
              height={60}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
            <span className='text-primary-purple text-3xl font-semibold ml-1'>
              Booky
            </span>
          </Link>
          <CardTitle className='text-center text-gray-700 text-xl'>
            Create Account
          </CardTitle>
          <CardDescription className='text-center text-gray-500'>
            Enter your information below
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUpPage
