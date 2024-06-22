const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const exerciseRoutes = require('./routes/exerciseRoutes')
const workoutRoutes = require('./routes/workoutRoutes')


dotenv.config();

const app = express();

connectDB();

app.use(cors())
app.use(express.json())


app.use('/auth', authRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/workouts', workoutRoutes);

const port = 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));