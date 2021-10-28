const express = require('express')

const { authorController, bookController, categoryController } = require('../../controllers')

const router = express.Router()

router.post('/getAllBook', bookController.getAllBook)
router.post('/getOneBook', bookController.getOneBook)
router.post('/getAllCategory', categoryController.getAllCategory)
router.post('/getOneCategory', categoryController.getOneCategory)
router.post('/getAllAuthor', authorController.getAllAuthor)
router.post('/getOneAuthor', authorController.getOneAuthor)

module.exports = router
