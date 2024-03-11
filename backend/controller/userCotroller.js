

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../model/userModel');


// post /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  console.log(req.body);

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("add all fields")
  }

  const existingUser = await User.find({ email: email })
  if (existingUser > 0) {
    res.status(400)
    throw new Error(" user already exist ")
  }

  //hash password 
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashPassword
  })

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: genarateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('invalid user data')
  }
})

// post /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email , password }  = req.body;

  const user  = await User.findOne({email: email})

  if (user && await ( bcrypt.compare(password , user.password) )) {
    res.json({
      id: user._id,
      name : user.name,
      email:user.email,
      token: genarateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error('invalid credentials')
  }
})

// post /api/users/me
// access private
const getMe = asyncHandler(async (req, res) => {
  const { _id  ,  name , email } =  await User.findById(req.user.id);
  res.status(200).json({
    id : _id,
    name,
    email
  })
})

const genarateToken = (id) => {
  return jwt.sign( {id} , process.env.JWT_SECRET , {
    expiresIn : '3d'
  } )
}


module.exports = {
  registerUser,
  loginUser,
  getMe
}