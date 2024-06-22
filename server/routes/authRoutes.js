const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/signup', async(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;

  try{

    await User.create({
      username,
      password
    })
    
    const token = jwt.sign({username}, process.env.JWT_SECRET)
    res.status(201).json({token})
  } catch(e){
    res.status(400).json({msg: e.message})
  }
});

router.post('/signin', async(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;

  try{

    const user = await User.findOne({
      username,
      password
    })

    if(!user){
      return res.status(401).json({msg: 'Invalid credentials'})
    }
    
    const token = jwt.sign({username}, process.env.JWT_SECRET)
    res.status(201).json({token})
    
  } catch(e){
    res.status(400).json({msg: e.message})
  }
});


module.exports = router;