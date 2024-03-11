const asyncHandler = require('express-async-handler')

const getGoals = (req,res) => {
  res.status(200).json({message : 'Get goals'})
}

const setgoal = asyncHandler(async (req,res) => {
  // console.log(req.body.text);
  if (!req.body.text) {
     res.status(400).json({message :'plaese not somthong'})
  }
  res.status(200).json({message : 'Set goals'})
})

const updateGoal = asyncHandler(async(req,res) => {
  res.status(200).json({message : `update goal ${req.params.id}`})
})

const deleteGoal = asyncHandler(async (req,res) => {
  res.status(200).json({message : `delete goal ${req.params.id}`})
})


module.exports = {
  getGoals,setgoal,updateGoal,deleteGoal
}
