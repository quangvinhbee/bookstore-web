const express = require('express')
const {
    authorController,
    bookController,
    categoryController,
    authController,
    userController,
} = require('../../controllers')

const router = express.Router()

router.post('/createBook', bookController.createBook)
router.post('/deleteOneBook', bookController.deleteOneBook)
router.post('/updateOneBook', bookController.updateOneBook)
router.post('/createCategory', categoryController.createCategory)
router.post('/deleteOneCategory', categoryController.deleteOneCategory)
router.post('/updateOneCategory', categoryController.updateOneCategory)
router.post('/createAuthor', authorController.createAuthor)
router.post('/deleteOneAuthor', authorController.deleteOneAuthor)
router.post('/updateOneAuthor', authorController.updateOneAuthor)
router.post('/getAllUser', userController.getAllUser)
router.post('/updateOneUser', userController.updateOneUser)
router.post('/deleteOneUser', userController.deleteOneUser)
router.post('/getOneUser', userController.getOneUser)

router.get('/adminGetMe', authController.adminGetMe)

module.exports = router
