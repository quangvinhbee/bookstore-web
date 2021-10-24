const express = require('express')
const { authorController, bookController, categoryController } = require('../../controllers')

const router = express.Router()

router.post('/createAuthor', authorController.createAuthor)
router.post('/createCategory', categoryController.createCategory)
router.post('/createBook', bookController.createBook)

module.exports = router
