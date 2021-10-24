const httpStatus = require('http-status')

const ApiError = require('../../utils/api-error')
const { create, getAll } = require('./shared/services')
const { Category } = require('../models')

const createCategory = async (categoryBody) => {
    return await create(Category, categoryBody).catch((err) => {
        throw err
    })
}

module.exports = {
    createCategory,
}
