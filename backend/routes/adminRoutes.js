const express = require ('express')
const router = express.Router()
const { adminLogin , getUserData } = require('../controller/adminController')

router.post('/',adminLogin)
router.get('/userData',getUserData)
router.post('/addUser' , )

module.exports = router 