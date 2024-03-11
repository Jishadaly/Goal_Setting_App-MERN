const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')

const getGoals =asyncHandler(async (req,res) => {

  const goals = await Goal.find();
  res.status(200).json(goals)
})

const setgoal = asyncHandler(async (req,res) => {
  // console.log(req.body.text);
  if (!req.body.text) {
     res.status(400).json({message :'plaese not somthong'})
  }
  const goal  = await Goal.create({
    text : req.body.text
  })
  res.status(200).json(goal)
})

const updateGoal = asyncHandler(async(req,res) => {
  const goal  = await Goal.findById(req.params.id)
  if(!goal){
    res.status(400)
    throw new Error("goal not found");
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
  res.status(200).json(goal)
})


module.exports = {
  getGoals,setgoal,updateGoal,deleteGoal
}

