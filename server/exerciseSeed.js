// exerciseSeed.js

const mongoose = require('mongoose');
const Exercise = require('./models/exercise'); // Adjust path as per your project structure
const dotenv = require('dotenv')

const exerciseNames = [
  'Push-up',
  'Sit-up',
  'Squat',
  'Plank',
  'Pull-up',
  'Lunges',
  'Jumping Jacks',
  'Burpees',
  'Deadlift',
  'Bench Press',
  'Crunches',
  'Leg Raises',
  // Add more exercise names as needed
];

dotenv.config()

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Seed exercises to database
    await Exercise.deleteMany(); // Clear existing exercises
    const createdExercises = await Exercise.insertMany(exerciseNames.map(name => ({ name: name.toLowerCase() })));
    console.log(`${createdExercises.length} exercises seeded successfully.`);
  } catch (error) {
    console.error('Error seeding exercises:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
});
