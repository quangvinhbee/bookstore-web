const express = require('express')

const { authorController, bookController, categoryController } = require('../../controllers')

const router = express.Router()

router.get('/getAllBook', bookController.getAllBook)

module.exports = router
