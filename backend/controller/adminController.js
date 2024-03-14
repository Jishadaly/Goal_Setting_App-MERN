const Admin = require('../model/adminModel')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler');


const adminLogin = asyncHandler(async (req, res) => {
  const { email , password }  = req.body;
  console.log(req.body);
  const admin  = await Admin.findOne({email:email});
  console.log(admin);
  if (admin && password === admin.password) {
      res.status(200).json(admin)
  }else{
    res.status(400).json({message : "error"}) 
  }

})

const getUserData = asyncHandler(async (req ,res) => {
     const userData = await User.find()
     if (userData) {
       res.status(200).json(userData)
     }else{
      res.status(400).json("no data ")
     }
})


const createUser = asyncHandler(async (req , res) => {
    try {
      
    } catch (error) {
      console.log(error);
    }
})

module.exports = { adminLogin , getUserData , createUser} 