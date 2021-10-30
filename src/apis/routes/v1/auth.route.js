const express = require('express')
const { authController } = require('../../controllers')
const { verifyTokenUser } = require('../../controllers/auth.controller')

const router = express.Router()

router.post('/createUser', authController.registerUser)
router.post('/loginUser', authController.loginUserwithEmailAndPassword)
router.get('/userGetMe', verifyTokenUser, authController.userGetMe)

module.exports = router
