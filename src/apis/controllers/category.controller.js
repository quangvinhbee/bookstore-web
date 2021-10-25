const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { categoryService } = require('../services')

const createCategory = catchAsync(async (req, res) => {
    console.log(req.body)
    const respone = await categoryService.createCategory(req.body).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

const getAllCategory = catchAsync(async (req, res) => {
    const { filter, query } = req.body
    const respone = await categoryService.getAllCategory(filter, query).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

const getOneCategory = catchAsync(async (req, res) => {
    const { id } = req.body
    const respone = await categoryService.getOneCategory(id).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

const deleteOneCategory = catchAsync(async (req, res) => {
    const { id } = req.body
    const respone = await categoryService.deleteOneCategory(id).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

const updateOneCategory = catchAsync(async (req, res) => {
    const data = req.body
    const respone = await categoryService.updateOneCategory(data?.id, data).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

module.exports = {
    createCategory,
    getAllCategory,
    getOneCategory,
    deleteOneCategory,
    updateOneCategory,
}
