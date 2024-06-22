import React, { useState } from 'react';
import axios from 'axios';
import WorkoutForm from '../components/WorkoutForm';

function LogWorkout(){
  const [submissionStatus, setSubmissionStatus]= useState('');
  const [error,setError] =useState('');

  async function handleSubmit(workout){
    try{
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/workouts/logWorkout', workout, {
        headers: {Authorization: `Bearer ${token}`}
      });
      setSubmissionStatus('success')
      setError('')
    }catch(error){
      console.log(error);
      setSubmissionStatus('error')
      setError(`Failed to log workout. ${error.message}`)
    }
  }

  return(
    <div  className='flex flex-col justify-center items-center gap-4'>
      <h1 className='text-xl sm:text-2xl md:text-3xl font-bold mt-24'>Log a New Workout</h1>
      <WorkoutForm onSubmit = {handleSubmit} />
      {submissionStatus === 'success' && (
        <p className='text-green-500'>Workout logged successfully!</p>
      )}
      {submissionStatus === 'error' && error && (
        <p className='text-red-500'>{error}</p>
      )}
    </div>
  )
}

export default LogWorkout;