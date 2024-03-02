import React from 'react'
import { Input } from '../components/ui/input'


const Home = () => {
  return (
    <section className='py-24 min-h-screen  sm:max-w-[45rem] sm:mx-auto '>
     <div className="homeDisp flex flex-col text-center gap-2">
     <h1 className='text-4xl font-extrabold sm:text-5xl'>
      Discover & share AI-Powered Prompts
      </h1>
      <p className='mt-5'>
      Promptopia ia an open-source platform for AI-generated prompting tool for modern world to discover, create and share creative prompts
      </p>
      <form className='w-full mt-24 p-2'>
      <Input type='text' id='Search' placeholder='Search For a tag or a username'></Input>
     </form>
     </div>
    </section>
  )
}

export default Home
