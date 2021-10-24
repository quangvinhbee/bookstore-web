const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { authorService } = require('../services')

const createAuthor = catchAsync(async (req, res) => {
    console.log(req.body)
    const respone = await authorService.createAuthor(req.body).catch((err) => {
        res.status(httpStatus.FORBIDDEN).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

module.exports = { createAuthor }
