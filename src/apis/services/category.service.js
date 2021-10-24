const httpStatus = require('http-status')

const ApiError = require('../../utils/api-error')
const { Category } = require('../models')

const createCategory = async (categoryBody) => {
    const category = await Category.create(categoryBody).catch((err) => {
        throw ApiError(httpStatus.FORBIDDEN, err.message)
    })
    if (category) return category
}

module.exports = {
    createCategory,
}
