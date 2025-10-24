const LoadingPage = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='relative inline-flex'>
        <div className='w-8 h-8 bg-primary-purple rounded-full'></div>
        <div className='w-8 h-8 bg-primary-purple rounded-full absolute top-0 left-0 animate-ping transform scale-90  transition-all duration-500'></div>
        <div className='w-8 h-8 bg-primary-purple rounded-full absolute top-0 left-0 animate-pulse transform scale-90  transition-all duration-500'></div>
      </div>
    </div>
  )
}

export default LoadingPage
