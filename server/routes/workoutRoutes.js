const express = require('express');
const Workout = require('../models/workout');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/logWorkout', auth,  async (req,res) => {
  let {workoutName, exercises, date} = req.body;
  try{
    const workout = new Workout ({
      userId: req.user._id,
      workoutName,
      exercises,
      date
    });
    await workout.save();
    res.status(201).json(workout);
  }catch(e){
    res.status(400).json({msg: e.message})
  }
})

router.get('/getWorkoutHistory', auth, async(req,res)=>{
  const username = req.username
  try{
    const workouts = await Workout.find({userId: req.user._id})
    res.status(200).json(workouts);
  }catch(e){
    res.status(400).json({msg: e.message});
  }
});

router.get('/getPreviousEntry/:exerciseName', auth, async(req,res)=>{
  try{
    const exerciseName = req.params.exerciseName;
    
    const previousEntry = await Workout.findOne({
      'exercises.name': exerciseName,
      userId: req.user._id
    }).sort({date: -1});

    if(!previousEntry){
      return res.status(404).json({
        msg: `No previous entry`
      })
    }

    const exerciseEntry = previousEntry.exercises.find(exercise => exercise.name === exerciseName);

    if(!exerciseEntry){
      return res.status(404).json({
        msg: `No previous entry`
      })
    }

    const sets = exerciseEntry.sets.map(set => `${set.weight} kg x ${set.reps} reps`)

    res.status(200).json({exerciseName, sets});
  }catch(e){
    res.status(400).json({msg: e.message});
  }
})

module.exports = router;