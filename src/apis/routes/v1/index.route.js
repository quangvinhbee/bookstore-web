const express = require('express')

const { authorController, bookController, categoryController } = require('../../controllers')

const router = express.Router()

router.get('/getAllBook', bookController.getAllBook)
router.get('/getOneBook', bookController.getOneBook)
router.get('/getAllCategory', categoryController.getAllCategory)
router.get('/getOneCategory', categoryController.getOneCategory)
router.get('/getAllAuthor', authorController.getAllAuthor)
router.get('/getOneAuthor', authorController.getOneAuthor)

module.exports = router
