const Admin = require('../model/adminModel')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


const adminLogin = asyncHandler(async (req, res) => {
  const { email , password }  = req.body;
  console.log(req.body);
  const admin  = await Admin.findOne({email:email});
  console.log("ADMIN DATA",admin);
  if (admin && password === admin.password) {
      res.status(200)
      res.json({
        id: admin._id,
        name : admin.name,
        email:admin.email,
        token: genarateToken(admin._id),
      })
  }else{
    res.status(400).json({message : "error"}) 
  }

})

const genarateToken = (id) => {
  
  return jwt.sign( {id} , process.env.JWT_SECRET , {
    expiresIn : '30d'
  } )
}


const getUserData = asyncHandler(async (req ,res) => {
     const userData = await User.find()
     if (userData) {
       res.status(200).json(userData)
     }else{
      res.status(400).json("no data ")
     }
})

const userBlock = asyncHandler(async (req , res)=> {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId)
   if (!user) {
     res.status(400)
     throw new Error("user not found")
   }
   user.isBlocked = !user.isBlocked;
   await user.save()
   const users = await User.find();
   res.status(200).json({users})

  } catch (error) {
    console.log(error);
  }
})


const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = { adminLogin, getUserData, updateUser, userBlock };