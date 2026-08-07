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
import CredentialsSignInForm from './credentials-signin-form'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import LockButton from '@/components/lock-button'

export const metadata: Metadata = {
  title: 'Sign In',
}

const SignInPage = async (props: {
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
    <div className='relative w-full h-full'>
      <div className='w-full max-w-md mx-auto z-20'>
        <Card className='border-gray-200 z-20'>
          <CardHeader className='space-y-4 pt-8 relative'>
            <LockButton />
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
              Sign In
            </CardTitle>
            <CardDescription className='text-center text-gray-500'>
              Sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <CredentialsSignInForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SignInPage
