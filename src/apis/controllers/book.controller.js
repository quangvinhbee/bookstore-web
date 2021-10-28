const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { bookService } = require('../services')

const createBook = catchAsync(async (req, res) => {
    console.log(req.body)
    const response = await bookService.createBook(req.body).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const getAllBook = catchAsync(async (req, res) => {
    const { filter, query } = req.body
    console.log(req.body)
    const response = await bookService.getAllBook(filter, query).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const getOneBook = catchAsync(async (req, res) => {
    const { id } = req.body
    console.log(req.body)
    const response = await bookService.getOneBook(id).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const deleteOneBook = catchAsync(async (req, res) => {
    const { id } = req.body
    console.log(req.body)
    const response = await bookService.deleteOneBook(id).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const updateOneBook = catchAsync(async (req, res) => {
    const data = req.body
    console.log(req.body)
    const response = await bookService.updateOneBook(data?.id, data).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

module.exports = { createBook, getAllBook, getOneBook, deleteOneBook, updateOneBook }
