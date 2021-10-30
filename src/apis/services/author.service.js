const httpStatus = require('http-status')

const ApiError = require('../../utils/api-error')
const { getAll, create, deleteOne, updateOne, getOne } = require('./shared/services')
const { Author } = require('../models')

const createAuthor = async (AuthorBody) => {
    return await create(Author, AuthorBody).catch((err) => {
        throw ApiError(httpStatus.FORBIDDEN, err.message)
    })
}

const getAllAuthor = async (filter = {}, query = {}) => {
    return await getAll(Author, filter, query).catch((err) => {
        throw err
    })
}

const getOneAuthor = async (id) => {
    return await getOne(Author, id).catch((err) => {
        throw err
    })
}

const deleteOneAuthor = async (id) => {
    return await deleteOne(Author, id).catch((err) => {
        throw err
    })
}

const updateOneAuthor = async (id, data) => {
    return await updateOne(Author, id, data).catch((err) => {
        throw err
    })
}

module.exports = {
    createAuthor,
    getAllAuthor,
    deleteOneAuthor,
    updateOneAuthor,
    getOneAuthor,
}
