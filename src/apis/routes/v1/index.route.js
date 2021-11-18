const express = require('express')

const {
    authorController,
    bookController,
    categoryController,
    userController,
} = require('../../controllers')
const { verifyTokenAdmin } = require('../../controllers/auth.controller')

const router = express.Router()

router.post('/getAllBook', bookController.getAllBook)
router.post('/getOneBook', bookController.getOneBook)
router.post('/getAllCategory', categoryController.getAllCategory)
router.post('/getOneCategory', categoryController.getOneCategory)
router.post('/getAllAuthor', authorController.getAllAuthor)
router.post('/getOneAuthor', authorController.getOneAuthor)

router.post('/getAllUser', verifyTokenAdmin, userController.getAllUser)
router.post('/getOneUser', verifyTokenAdmin, userController.getOneUser)

module.exports = router
