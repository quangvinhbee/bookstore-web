const express = require('express')
const { authorController, bookController, categoryController } = require('../../controllers')

const router = express.Router()

router.post('/createBook', bookController.createBook)
router.get('/deleteOneBook', bookController.deleteOneBook)
router.post('/updateOneBook', bookController.updateOneBook)
router.post('/createCategory', categoryController.createCategory)
router.get('/deleteOneCategory', categoryController.deleteOneCategory)
router.post('/updateOneCategory', categoryController.updateOneCategory)
router.post('/createAuthor', authorController.createAuthor)
router.get('/deleteOneAuthor', authorController.deleteOneAuthor)
router.post('/updateOneAuthor', authorController.updateOneAuthor)

module.exports = router
