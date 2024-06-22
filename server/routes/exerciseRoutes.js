const express = require('express');
const Exercise = require('../models/exercise');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/getExercise', auth, async(req, res) => {
  try{
    const exercises = await Exercise.find({})
    res.status(200).json(exercises);
  }catch(e){
    res.status(400).json({msg: e.message});
  }
});

router.post('/addExercise', auth ,async (req,res)=>{
  let {name} = req.body

  name = name.toLowerCase();

  try{
    let exercise = await Exercise.findOne({name});

    if(exercise){
      return res.json({msg: 'Exercise already exists'})
    }

    if(!exercise){
      exercise = new Exercise({name})
      await exercise.save()
    }
    res.status(201).json(exercise)
  } catch(e){
    res.status(400).json({msg: e.message})
  }
});

module.exports = router;