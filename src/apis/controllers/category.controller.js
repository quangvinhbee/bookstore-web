const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { categoryService } = require('../services')

const createCategory = catchAsync(async (req, res) => {
    console.log(req.body)
    const response = await categoryService.createCategory(req.body).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const getAllCategory = catchAsync(async (req, res) => {
    const { filter, query } = req.body
    const response = await categoryService.getAllCategory(filter, query).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const getOneCategory = catchAsync(async (req, res) => {
    const { id } = req.body
    const response = await categoryService.getOneCategory(id).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const deleteOneCategory = catchAsync(async (req, res) => {
    const { id } = req.body
    const response = await categoryService.deleteOneCategory(id).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const updateOneCategory = catchAsync(async (req, res) => {
    const data = req.body
    const response = await categoryService.updateOneCategory(data?.id, data).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

module.exports = {
    createCategory,
    getAllCategory,
    getOneCategory,
    deleteOneCategory,
    updateOneCategory,
}
