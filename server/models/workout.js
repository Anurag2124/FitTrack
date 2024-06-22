const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true },
  
  workoutName: {type: String, required:true},
  exercises: [
    {
      name: {type: String, required: true},
      sets: [
        {
          weight: {type: Number, required: true},
          reps: {type: Number, required: true}
        }
      ]
    }
  ],

  date: {type: Date, default: Date.now},
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout