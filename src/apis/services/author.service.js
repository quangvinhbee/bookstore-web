const httpStatus = require('http-status')

const ApiError = require('../../utils/api-error')
const { Author } = require('../models')

const createAuthor = async (authorBody) => {
    const author = await Author.create(authorBody).catch((err) => {
        throw ApiError(httpStatus.FORBIDDEN, err.message)
    })
    if (author) return author
}

module.exports = {
    createAuthor,
}
