const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next) => {
  const token = req.headers.authorization
  const words = token.split(" ")
  const jwtToken = words[1];

  try{
    if(!token){
      return res.status(401).json({msg: 'Authorization denied'})
    }

    const verified = jwt.verify(jwtToken,process.env.JWT_SECRET);
    const user = await User.findOne({username: verified.username})

    if (verified.username){
      req.username = verified.username;
      req.user = user;
      next();
    }else{
      res.status(403).json({
        msg: 'User doesn\'t exist'
      })
    }
  }catch(e){
    res.status(401).json({
      msg: 'Unauthorized'
    })
  }

}

module.exports = auth;