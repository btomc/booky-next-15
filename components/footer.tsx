import { APP_NAME } from '@/lib/constants'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className=' text-gray-400 bg-gray-50'>
      <div className='flex flex-col md:flex-row items-center justify-center gap-8 pt-6 text-sm'>
        <a
          href='#'
          className='font-medium text-gray-500 hover:text-gray-700 transition-all'
        >
          About Us
        </a>
        <a
          href='#'
          className='font-medium text-gray-500 hover:text-gray-700 transition-all'
        >
          Return & Refund Policy
        </a>
        <a
          href='#'
          className='font-medium text-gray-500 hover:text-gray-700 transition-all'
        >
          Delivery Information
        </a>
        <a
          href='#'
          className='font-medium text-gray-500 hover:text-gray-700 transition-all'
        >
          Contact Us
        </a>
        <a
          href='#'
          className='font-medium text-gray-500 hover:text-gray-700 transition-all'
        >
          Help Center
        </a>
      </div>
      <div className='flex items-center justify-center gap-4 mt-8 mb-4 text-primary-purple'>
        <a
          href='#'
          className='hover:-translate-y-0.5 transition-all duration-300'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </a>
        <a
          href='#'
          className='hover:-translate-y-0.5 transition-all duration-300'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </a>
        <a
          href='#'
          className='hover:-translate-y-0.5 transition-all duration-300'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </a>
        <a
          href='#'
          className='hover:-translate-y-0.5 transition-all duration-300'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </a>
      </div>
      <div className='p-5 flex-center'>
        {currentYear} {APP_NAME}. All Right Reserved
      </div>
    </footer>
  )
}

export default Footer
