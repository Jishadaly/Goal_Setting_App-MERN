const express = require ('express')
const router = express.Router()
const { adminLogin , getUserData ,updateUser, userBlock} = require('../controller/adminController')
const {adminAuth} = require('../middlware/authMiddlware')

router.post('/adminLogin',adminLogin)
router.get('/getUserData',getUserData)
router.put('/update_UserData/:id', updateUser)



module.exports = router 