const User = require('../models/userModel')

//login user controller 
const loginUser = async (req,res) => {
  res.json({mssg: 'login user'})
}

//signup user controller 

const singupUser = async(req,res) => {
  res.json({mssg: 'signup User'})
}

module.exports = {loginUser, singupUser}