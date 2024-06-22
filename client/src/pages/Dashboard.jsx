import React from 'react'
import { Link } from 'react-router-dom';

function Dashboard(){
  return(
    <div className='flex flex-col justify-center items-center'>
      
      <Link to = "/log-workout">
        <button className='bg-lime-600 px-6 py-2 rounded-full 
          hover:bg-lime-700 transition duration-200 min-h-12 mx-auto mt-4 mb-2'>
          Log a New Workout
        </button>
      </Link>
      
      <Link to = "/workout-history">
        <button className='bg-lime-600 px-6 py-2 rounded-full 
          hover:bg-lime-700 transition duration-200 min-h-12 mx-auto mt-4 mb-2'>
          View Workout History
        </button>
      </Link>
      
    </div>
  )
}

export default Dashboard;