const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { bookService } = require('../services')

const createBook = catchAsync(async (req, res) => {
    console.log(req.body)
    const respone = await bookService.createBook(req.body).catch((err) => {
        console.log('Lỗi tạo sách')
        res.status(httpStatus.FORBIDDEN).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

const getAllBook = catchAsync(async (req, res) => {
    const respone = await bookService.getAllBook(req.body).catch((err) => {
        console.log('Lỗi tạo sách')
        res.status(httpStatus.FORBIDDEN).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

module.exports = { createBook, getAllBook }
