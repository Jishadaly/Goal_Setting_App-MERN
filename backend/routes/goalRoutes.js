const express = require('express')
const router = express.Router()
const { getGoals, setgoal, deleteGoal, updateGoal } = require('../controller/goalController')

// in the case of same routes '/'
router.route('/').get(getGoals).post(setgoal)

router.get('/',getGoals)
router.post('/',setgoal)
router.delete('/:id',deleteGoal)
router.put('/:id',updateGoal)



module.exports = router