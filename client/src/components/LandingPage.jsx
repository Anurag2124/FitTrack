import React from 'react'
import { Link } from 'react-router-dom';

function LandingPage(){
  return(
    <div className='flex flex-col justify-center items-center gap-3'>

      <h1 className='text-3xl md:text-4xl 
      lg:text-5xl font-bold'>Welcome to <span className='text-lime-500'>FitTrack</span></h1>

      <p className='text-lg md:text-xl lg:text-2xl 
      px-2 text-center'><span className='text-lime-500'>Track </span> 
      your <span className='text-lime-500'>workouts </span> 
      and monitor your progress.</p>

      <div className='flex space-x-4 mt-4 text-lg'>

        <Link to = "/signup">
          <button className='bg-lime-600 px-6 py-2 rounded-full 
          hover:bg-lime-700 transition duration-200'>
            Sign Up
          </button>
        </Link>

        
        <Link to = "/signin">
          <button className='bg-lime-600 px-6 py-2 rounded-full 
          hover:bg-lime-700 transition duration-200'>
            Sign In
          </button>
         </Link>

      </div>
    </div>
  )
}

export default LandingPage;