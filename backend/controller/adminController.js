const Admin = require('../model/adminModel')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const admin = await Admin.findOne({ email: email });
  console.log("ADMIN DATA", admin);
  if (admin && password === admin.password) {
    res.status(200)
    res.json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      token: genarateToken(admin._id),
    })
  } else {
    res.status(400).json({ message: "error" })
  }

})

const genarateToken = (id) => {

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}


const getUserData = asyncHandler(async (req, res) => {
  const userData = await User.find()
  if (userData) {
    res.status(200).json(userData)
  } else {
    res.status(400).json("no data ")
  }
})

const userBlock = asyncHandler(async (req, res) => {
  try {
    console.log("////////", req.body);
    const userId = req.body.userId;
    const user = await User.findById(userId)
    if (!user) {
      res.status(400)
      throw new Error("user not found")
    }
    user.isBlocked = !user.isBlocked;
    await user.save()
    const users = await User.find();
    res.status(200).json({ users })

  } catch (error) {
    console.log(error);
  }
})


const updateUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.body.userId;

    const { body } = req;

    const updatedUser = await User.findByIdAndUpdate(userId, body, { new: true });
    const users = await User.find()
    console.log(users);
    if (!users) {
      res.status(404).json({ message: "User not found" });
      return;
    } else {
      res.status(200).json({ users });
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body);
    if (!name || !email || !password) {
      res.status(400)
      throw new Error("Add all feilds")
    }

    const existingUser = await User.find({ email: email })
    if (existingUser > 0) {
      res.status(200)
      throw new Error("user alredy exist")
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
        token: genarateToken(user._id),
        
      })

    } else {
      res.status(400)
      throw new Error('invalid user data')
    }
  } catch (error) {
    console.error(error);
  }
})

const serachUser = asyncHandler(async (req ,res) => {
   try {
       const query = req.body.searchQuery;
       
   } catch (error) {
    console.log(error);
   }
})



module.exports = { adminLogin, getUserData, updateUser, userBlock, createUser };