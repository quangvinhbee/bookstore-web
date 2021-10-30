const express = require('express')
const { authController } = require('../../controllers')
const { verifyTokenAdmin } = require('../../controllers/auth.controller')

const router = express.Router()

router.post('/createUser', authController.registerUser)
router.post('/loginUser', authController.loginUserwithEmailAndPassword)
router.get('/userGetMe', authController.userGetMe)

module.exports = router
