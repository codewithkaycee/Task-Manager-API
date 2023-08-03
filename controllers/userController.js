const User = require('../models/userModel')

//login user controller 
const loginUser = async (req,res) => {
  res.json({mssg: 'login user'})
}

//signup user controller 

const signupUser = async(req,res) => {
  const {email, password} = req.body

  try {
    const user = await User. signup(email,password);
    // Res with a successful status and the user's email
    res.status(200).json({email, user})
    // If an error occurs, res with an error status and the error message
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {loginUser, signupUser}