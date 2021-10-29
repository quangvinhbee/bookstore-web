const httpStatus = require('http-status')

const ApiError = require('../../utils/api-error')
const { getAll, create, deleteOne, updateOne, getOne } = require('./shared/services')
const { Book } = require('../models')

const createBook = async (bookBody) => {
    return await create(Book, bookBody).catch((err) => {
        throw ApiError(httpStatus.FORBIDDEN, err.message)
    })
}

const getAllBook = async (filter = {}, query = {}, search) => {
    return await getAll(Book, filter, query, search).catch((err) => {
        throw err
    })
}

const getOneBook = async (id) => {
    return await getOne(Book, id).catch((err) => {
        throw err
    })
}

const deleteOneBook = async (id) => {
    return await deleteOne(Book, id).catch((err) => {
        throw err
    })
}

const updateOneBook = async (id, data) => {
    return await updateOne(Book, id, data).catch((err) => {
        throw err
    })
}

module.exports = {
    createBook,
    getAllBook,
    deleteOneBook,
    updateOneBook,
    getOneBook,
}
