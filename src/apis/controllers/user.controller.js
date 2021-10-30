const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { User } = require('../models')
const { userService } = require('../services')

const getAllUser = catchAsync(async (req, res) => {
    const { filter, query, search } = req.body
    const response = await userService.getAllUser(filter, query, search).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const getOneUser = catchAsync(async (req, res) => {
    const { id } = req.body
    const response = await userService.getOneUser(id).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const deleteOneUser = catchAsync(async (req, res) => {
    const { id } = req.body
    const response = await userService.deleteOneUser(id).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const updateOneUser = catchAsync(async (req, res) => {
    const data = req.body
    const response = await userService.updateOneUser(data?.id, data).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

module.exports = {
    getAllUser,
    getOneUser,
    deleteOneUser,
    updateOneUser,
}
