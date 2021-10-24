const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { categoryService } = require('../services')

const createCategory = catchAsync(async (req, res) => {
    console.log(req.body)
    const respone = await categoryService.createCategory(req.body).catch((err) => {
        res.status(httpStatus.FORBIDDEN).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

module.exports = { createCategory }
