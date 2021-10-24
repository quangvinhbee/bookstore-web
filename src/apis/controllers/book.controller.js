const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { bookService } = require('../services')

const createBook = catchAsync(async (req, res) => {
    console.log(req.body)
    const respone = await bookService.createBook(req.body).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

const getAllBook = catchAsync(async (req, res) => {
    const { filter, query } = req.body
    const respone = await bookService.getAllBook(filter, query).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

const getOneBook = catchAsync(async (req, res) => {
    const { id } = req.body
    const respone = await bookService.getOneBook(id).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

const deleteOneBook = catchAsync(async (req, res) => {
    const { id } = req.body
    const respone = await bookService.deleteOneBook(id).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

const updateOneBook = catchAsync(async (req, res) => {
    const data = req.body
    const respone = await bookService.updateOneBook(data?.id, data).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

module.exports = { createBook, getAllBook, getOneBook, deleteOneBook, updateOneBook }
