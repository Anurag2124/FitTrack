// WorkoutHistory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWorkoutHistory();
  }, []);

  const fetchWorkoutHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://fittrack-q09o.onrender.com/workouts/getWorkoutHistory', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkouts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workout history:', error);
      setLoading(false);
      setError('Failed to fetch workout history');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='max-w-xl w-96 md:w-full mx-auto mt-20 mb-8'>
      <h2 className='text-2xl font-bold mb-4 mt-2'>Workout History</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div className='space-y-4'>
          {workouts.map((workout, index) => (
            <div key={index} className='rounded-xl bg-slate-700 p-4'>
              <p className='font-bold text-lg text-slate-300 mb-2'>{workout.workoutName}</p>
              <p className='text-slate-400 mb-2'>Date: {new Date(workout.date).toLocaleDateString()}</p>
              <ul>
                {workout.exercises.map((exercise, exIndex) => (
                  <li key={exIndex}>
                    <p className='font-medium text-lime-600 mt-2'>{exercise.name}</p>
                    <ul className='list-disc list-inside'>
                      {exercise.sets.map((set, setIndex) => (
                        <li key={setIndex}>
                          {set.weight} kg x {set.reps} reps
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutHistory;
