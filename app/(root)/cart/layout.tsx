import Footer from '@/components/footer'
import Header from '@/components/shared/header'

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-screen flex-col bg-gray-100'>
      <main className='flex-1 wrapper'>{children}</main>
    </div>
  )
}
