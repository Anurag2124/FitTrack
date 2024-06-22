import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function SignupForm({setIsLoggedIn}){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate(); 

  async function handleSubmit(event){

    event.preventDefault();

    try{
      const response = await axios.post('https://fittrack-q09o.onrender.com/auth/signup', {username, password});
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      navigate('/dashboard')
    }catch(error){
      console.log(error);
      setError(`Failed to Signup. ${error.message}`)
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 shadow-xl bg-gray-800 border border-gray-900 border-solid p-6 max-w-4xl mx-auto rounded-xl '>
      <input className='rounded-lg px-6 py-2 bg-slate-300 
      w-80 text-slate-950 placeholder:text-slate-500'
        type='text' 
        placeholder='Username' 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
      />

      <input className='rounded-lg px-6 py-2 bg-slate-300 
      w-80 text-slate-950 placeholder:text-slate-500' 
        type='password' 
        placeholder='Password' 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className='bg-lime-600 px-6 py-2 rounded-full 
          hover:bg-lime-700 transition duration-200 mx-auto mt-4 mb-2' type='submit'>Sign Up
      </button>

      {error && <p className='text-red-500 text-sm mx-auto'>{error}</p>}

      </div>
    </form>
  )
}

export default SignupForm