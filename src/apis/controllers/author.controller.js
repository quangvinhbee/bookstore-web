const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { authorService } = require('../services')

const createAuthor = catchAsync(async (req, res) => {
    console.log(req.body)
    const response = await authorService.createAuthor(req.body).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const getAllAuthor = catchAsync(async (req, res) => {
    const { filter, query } = req.body
    const response = await authorService.getAllAuthor(filter, query).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const getOneAuthor = catchAsync(async (req, res) => {
    const { id } = req.body
    const response = await authorService.getOneAuthor(id).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const deleteOneAuthor = catchAsync(async (req, res) => {
    const { id } = req.body
    const response = await authorService.deleteOneAuthor(id).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const updateOneAuthor = catchAsync(async (req, res) => {
    const data = req.body
    const response = await authorService.updateOneAuthor(data?.id, data).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

module.exports = {
    createAuthor,
    getAllAuthor,
    getOneAuthor,
    deleteOneAuthor,
    updateOneAuthor,
}
