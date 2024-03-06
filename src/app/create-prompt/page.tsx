import React from 'react'
import CusInput from '../../components/custom/customInput'


const PromptCreatePage = () => {
  return (
    <div className='mb-8 mt-8 w-full sm:w-[32rem] sm:mx-auto  flex flex-col gap-4 items-center justify-center'>
      <h1 className='text-3xl font-extrabold text-center mb-3'>Create a post</h1>
      <p className='text-center font-semibold'>Create and sharing amazing prompts with the world and let your imangination run wild with any Ai platform</p>
      <CusInput></CusInput>
    </div>
  )
}

export default PromptCreatePage
