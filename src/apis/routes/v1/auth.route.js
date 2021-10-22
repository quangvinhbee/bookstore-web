const express = require('express')
const { authController } = require('../../controllers')

const router = express.Router()

router.post('/createUser', authController.registerUser)
router.post('/loginUser', authController.loginUserwithEmailAndPassword)

module.exports = router
