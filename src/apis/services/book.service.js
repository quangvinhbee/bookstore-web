const { query } = require('express')
const httpStatus = require('http-status')

const ApiError = require('../../utils/api-error')
const { Book } = require('../models')

const createBook = async (bookBody) => {
    const book = await Book.create(bookBody).catch((err) => {
        throw ApiError(httpStatus.FORBIDDEN, err.message)
    })
    if (book) return book
}

const getAllBook = async (query = {}) => {
    const books = await Book.paginate(query, { limit: 1 }).catch((err) => {
        throw ApiError(httpStatus.FORBIDDEN, err.message)
    })
    if (books) return books
}

module.exports = {
    createBook,
    getAllBook,
}
