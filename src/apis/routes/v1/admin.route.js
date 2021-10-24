const express = require('express')
const { authorController } = require('../../controllers')

const router = express.Router()

router.post('/createAuthor', authorController.createAuthor)

module.exports = router
