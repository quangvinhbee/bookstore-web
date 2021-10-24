const express = require('express')

const { authorController, bookController, categoryController } = require('../../controllers')

const router = express.Router()

router.get('/getAllBook', bookController.getAllBook)
router.get('/getOneBook', bookController.getOneBook)

module.exports = router
