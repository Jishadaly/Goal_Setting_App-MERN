const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../model/userModel');


// post /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
      res.status(400).json({ message: "Please provide all fields" });
      return;
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
  }

  // Hash password 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
      name,
      email,
      password: hashedPassword
  });

  if (user) {
      res.status(201).json({
          id: user._id,
          name: user.name,
          email: user.email,
          token: genarateToken(user._id)
      });
  } else {
      res.status(400).json({ message: "Invalid user data" });
  }
});



// post /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email , password }  = req.body;

  const user  = await User.findOne({email: email})
  if (user && await ( bcrypt.compare(password , user.password) )) {

    if (user.isBlocked === true) {
      res.status(403).json({ message: "User is blocked." });
    }

    res.json({
      id: user._id,
      name : user.name,
      email:user.email,
      profileURL:user.profileURL,
      token: genarateToken(user._id),
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
    expiresIn : '30d'
  } )
}


//uploading imgUrl
const uploadProfile = asyncHandler (async (req,res)=> {

  console.log(req.body);
const imgUrl = req.body.imgUrl;
console.log(imgUrl);
try {
    const user = await User.findByIdAndUpdate(
        req.user.id,
        { profileURL:  req.body.imgUrl },
        { new: true }
    );
    console.log("Updated user:", user);
    res.json(user); // Send updated user back as response if needed
} catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: 'Internal Server Error' });
}


  
  

})


module.exports = {
  registerUser,
  loginUser,
  getMe,
  uploadProfile
}