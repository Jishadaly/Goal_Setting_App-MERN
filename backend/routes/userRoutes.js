const express = require ('express')
const router = express.Router()
const { authorization } = require('../middlware/authMiddlware')
const { registerUser, loginUser, getMe } = require('../controller/userCotroller')

router.post('/',registerUser)
router.post('/login', loginUser)
router.get('/me', authorization,getMe)


module.exports =  router