const mongoose = require('mongoose')

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to database")
  }
  catch(e){
    console.error(e.message);
    process.exit(1) 
  }
}

module.exports = connectDB;