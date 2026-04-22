const LoginToast = () => {
  return (
    <div className='absolute -top-40 right-10 z-40 border border-gray-200 shadow-md px-8 py-4 rounded-lg'>
      <p className='text-gray-700 mb-1'>Credentials</p>
      <div className='flex flex-col gap-1 text-sm text-gray-500'>
        <span>{process.env.CREDEN_LOGIN}</span>
        <span>{process.env.CREDEN_PASS}</span>
      </div>
    </div>
  )
}

export default LoginToast
