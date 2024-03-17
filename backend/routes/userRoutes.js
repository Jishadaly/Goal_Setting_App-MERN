const express = require ('express')
const router = express.Router()
const { authorization } = require('../middlware/authMiddlware')
const { uploadProfile,registerUser, loginUser, getMe } = require('../controller/userCotroller')


router.post('/',registerUser)
router.post('/login', loginUser)
router.get('/me', authorization,getMe)
router.post('/profile/upload',authorization,uploadProfile )
router.post('userBlock',userBlock)



module.exports =  router