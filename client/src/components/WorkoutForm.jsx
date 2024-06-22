import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

function WorkoutForm({ onSubmit }) {
  const [workoutName, setWorkoutName] = useState('');
  const [date, setDate] = useState('');
  const [exercises, setExercises] = useState([{ name: '', sets: [{ weight: '', reps: '', previous: 'No previous entry' }] }]);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/exercises/getExercise', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExerciseOptions(response.data.map(ex => ({ value: ex._id, label: ex.name })));
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setError('Failed to fetch exercises.');
    }
  };

  const fetchPreviousEntries = async (exerciseName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/workouts/getPreviousEntry/${exerciseName}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.sets;
    } catch (error) {
      console.error('Error fetching previous entry: ', error);
      return 'No previous entry';
    }
  }

  const handleExerciseChange = async (exerciseIndex, newValue) => {
    const newExercises = [...exercises];
    if (newValue) {
      newExercises[exerciseIndex].name = newValue.label;
      const previousSets = await fetchPreviousEntries(newValue.label);
      newExercises[exerciseIndex].sets = previousSets.map(set => ({
        weight: '',
        reps: '',
        previous: set
      }));
    } else {
      newExercises[exerciseIndex].name = '';
      newExercises[exerciseIndex].sets = [{ weight: '', reps: '', previous: 'No previous entry' }];
    }
    setExercises(newExercises);
  };

  const handleSetChange = (exerciseIndex, setIndex, event) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets[setIndex][event.target.name] = event.target.value;
    setExercises(newExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: [{ weight: '', reps: '', previous: 'No previous entry' }] }]);
  };

  const addSet = (index) => {
    const newExercises = [...exercises];
    newExercises[index].sets.push({ weight: '', reps: '', previous: 'No previous entry' });
    setExercises(newExercises);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!workoutName || !date || exercises.some(ex => !ex.name || ex.sets.some(set => !set.weight || !set.reps))) {
      setError('Please fill in all fields before submitting.');
      return;
    }

    for (let exercise of exercises) {
      if (!exerciseOptions.some(option => option.label === exercise.name)) {
        try {
          setLoading(true);
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:3000/exercises/addExercise',
            { name: exercise.name },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setExerciseOptions([...exerciseOptions, { value: response.data._id, label: response.data.name }]);
          setLoading(false);
        } catch (error) {
          console.error('Error adding new exercise', error);
          setError('Failed to add new exercise');
          setLoading(false);
        }
      }
    }

    onSubmit({ workoutName, date, exercises });
  };

  return (
    <form className='max-w-xl w-96 md:w-full mx-auto border rounded-xl p-4 bg-slate-400/40' onSubmit={handleSubmit}>
      <div className='mb-4'>
        <input
          className='rounded-lg px-4 py-2 bg-slate-300 text-slate-700 placeholder:text-slate-500 w-full'
          type='text'
          placeholder='Workout Name'
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />
      </div>

      <div className='mb-4'>
        <input
          className='rounded-lg px-4 py-2 bg-slate-300 text-slate-700 placeholder:text-slate-500 w-full'
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} className='mb-4 border p-2 rounded-lg bg-slate-300'>
          <label className='block text-slate-700 mb-2'>Exercise Name</label>
          <CreatableSelect
            className='mb-2 text-slate-700 capitalize'
            value={exerciseOptions.find(option => option.label === exercise.name)}
            onChange={(newValue) => handleExerciseChange(exerciseIndex, newValue)}
            options={exerciseOptions}
            isClearable
          />

          {exercise.sets.map((set, setIndex) => (
            <div key={setIndex} className='border p-2 rounded-lg bg-slate-200 flex items-center mb-2'>
              <span className='text-slate-700 px-2 text-sm bg-slate-300 px-2 py-1 mr-2 rounded'>{setIndex + 1}</span>
              <span className='text-slate-700 text-sm px-2 py-1 mr-2'>{set.previous}</span>
              <input
                className='rounded-lg px-2 py-2 bg-slate-300 text-slate-700 placeholder:text-sm placeholder:text-slate-500 mr-2 w-1/3'
                type='number'
                name='weight'
                placeholder='Weight'
                value={set.weight}
                onChange={(e) => handleSetChange(exerciseIndex, setIndex, e)}
              />
              <input
                className='rounded-lg px-2 py-2 bg-slate-300 text-slate-700 placeholder:text-sm placeholder:text-slate-500 mr-2 w-1/3'
                type='number'
                name='reps'
                placeholder='Reps'
                value={set.reps}
                onChange={(e) => handleSetChange(exerciseIndex, setIndex, e)}
              />
            </div>
          ))}

          <button
            type='button'
            className='w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700 transition duration-200'
            onClick={() => addSet(exerciseIndex)}
          >
            Add Set
          </button>
        </div>
      ))}

      <button
        type='button'
        className='w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700 transition duration-200 mb-6'
        onClick={addExercise}
      >
        Add Exercise
      </button>

      <button
        type='submit'
        className='w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700 transition duration-200'
      >
        Save Workout
      </button>
      {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
    </form>
  );
}

export default WorkoutForm;
