const ApiError = require('../../../utils/api-error')
const httpStatus = require('http-status')
const getAll = async (schema, filter = {}, query = { limit: 10 }) => {
    return await schema.paginate(filter, query).catch((err) => {
        throw ApiError(httpStatus.FORBIDDEN, err.message)
    })
}

const getOne = async (schema, id) => {
    var result
    await schema
        .findById(id)
        .then((res) => (result = res))
        .catch((err) => {
            throw ApiError(httpStatus.FORBIDDEN, err.message)
        })
    return result
}

const create = async (schema, dataBody) => {
    return await schema.create(dataBody).catch((err) => {
        throw ApiError(httpStatus.FORBIDDEN, err.message)
    })
}

const deleteOne = async (schema, id) => {
    var result
    await schema
        .findByIdAndDelete(id)
        .maxTimeMS(1000)
        .then((res) => {
            if (res == null) throw ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy id cần xóa')
            else result = { message: 'Xóa thành công' }
        })
        .catch((err) => {
            throw ApiError(httpStatus.NOT_FOUND, err.message)
        })
    return result
}

const updateOne = async (schema, id, data) => {
    var result
    await schema
        .findByIdAndUpdate(id, data)
        .maxTimeMS(1000)
        .then((res) => {
            if (res == null) throw ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy')
        })
        .catch((err) => {
            throw ApiError(httpStatus.NOT_FOUND, err.message)
        })
    await schema
        .findById(id)
        .maxTimeMS(1000)
        .then((res) => {
            result = res
        })
        .catch((err) => {
            throw err
        })
    return result
}

module.exports = { getAll, getOne, create, deleteOne, updateOne }
