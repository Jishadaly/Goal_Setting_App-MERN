const express = require ('express')
const router = express.Router()
const { adminLogin , getUserData ,updateUser, userBlock , createUser} = require('../controller/adminController')
const {adminAuth} = require('../middlware/authMiddlware')

router.post('/adminLogin',adminLogin)
router.get('/getUserData',getUserData)
router.put('/editUser', updateUser)
router.post('/userBlock',userBlock)
router.post('/addUser', createUser)


module.exports = router 