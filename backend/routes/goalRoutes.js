const express = require('express')
const router = express.Router()
const { getGoals, setgoal, deleteGoal, updateGoal } = require('../controller/goalController')
const { authorization } = require('../middlware/authMiddlware')

// in the case of same routes '/'
router.route('/').get(authorization,getGoals).post(authorization,setgoal)

router.get('/',authorization,getGoals)
router.post('/',authorization,setgoal)
router.delete('/:id',authorization,deleteGoal)
router.put('/:id',authorization,updateGoal)

module.exports = router