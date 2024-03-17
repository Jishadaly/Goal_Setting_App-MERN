const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')


const getGoals =asyncHandler(async (req,res) => {

  const goals = await Goal.find({user:req.user.id});
  res.status(200).json(goals)
})

const setgoal = asyncHandler(async (req,res) => {
  // console.log(req.body.text);
  if (!req.body.text) {
     res.status(400).json({message :'plaese not somthong'})
  }
  const goal  = await Goal.create({
    text : req.body.text,
    user: req.user.id
  })
  res.status(200).json(goal)
})


const updateGoal = asyncHandler(async(req,res) => {
  const goal  = await Goal.findById(req.params.id)
  if(!goal){
    res.status(400)
    throw new Error("goal not found");
  }

  const user = await User.findById(req.user.id)
  if (!user) {  
    req.status(401)
    throw new Error('User not found')
  }

  if (goal.user.toString() !==  user.id) {
    res.status(401)
    throw new Error('user not authorised ')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id , req.body, { new:true, })
  if (!updatedGoal) {
    return res.status(404).json({ error: 'Goal not found' })
  }
  res.status(200).json(updatedGoal)
})


const deleteGoal = asyncHandler(async (req,res) => {
  const goal = await Goal.findByIdAndDelete(req.params.id)
  if (!goal) {
    throw new Error("goal not found");
  }

  const user = await User.findById(req.user.id)

  if (!user) {
     res.status(401)
     throw new Error('user not found')
  }

  if(goal.user.toString() !== user.id){
    res.status(401)
    throw new Error('user not authorised')
  }

  await goal.remove()
  res.status(200).json({id : req.user.id})
})



module.exports = {
  getGoals,setgoal,updateGoal,deleteGoal
}