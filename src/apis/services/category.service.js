const httpStatus = require('http-status')

const ApiError = require('../../utils/api-error')
const { getAll, create, deleteOne, updateOne, getOne } = require('./shared/services')
const { Category } = require('../models')

const createCategory = async (CategoryBody) => {
    return await create(Category, CategoryBody).catch((err) => {
        throw ApiError(httpStatus.FORBIDDEN, err.message)
    })
}

const getAllCategory = async (filter = {}, query = {}) => {
    return await getAll(Category, filter, query).catch((err) => {
        throw err
    })
}

const getOneCategory = async (id) => {
    return await getOne(Category, id).catch((err) => {
        throw err
    })
}

const deleteOneCategory = async (id) => {
    return await deleteOne(Category, id).catch((err) => {
        throw err
    })
}

const updateOneCategory = async (id, data) => {
    return await updateOne(Category, id, data).catch((err) => {
        throw err
    })
}

module.exports = {
    createCategory,
    getAllCategory,
    deleteOneCategory,
    updateOneCategory,
    getOneCategory,
}
