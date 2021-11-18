const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { userService, authService, tokenService } = require('../services')
const { ROLE } = require('../../constants/auth')

const registerUser = catchAsync(async (req, res) => {
    const response = await userService.createUser(req.body).catch((err) => {
        res.status(err.statusCode || httpStatus.FORBIDDEN).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const loginUserwithEmailAndPassword = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const response = await authService
        .loginUserwithEmailAndPassword(email, password)
        .catch((err) => res.status(err.statusCode).send(err))
    const tokens = await tokenService.generateAuthToken(response)
    res.status(httpStatus.ACCEPTED).send({ response, tokens })
})

const loginAdminwithEmailAndPassword = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const response = await authService
        .loginUserwithEmailAndPassword(email, password)
        .catch((err) => res.status(err.statusCode).send(err))
    const tokens = await tokenService.generateAuthToken(response)
    if (response.role !== ROLE.admin.role)
        res.status(httpStatus.UNAUTHORIZED).send({
            error: {
                message: 'Không đủ quyền',
            },
        })
    else res.status(httpStatus.ACCEPTED).send({ response, tokens })
})

const userGetMe = catchAsync(async (req, res) => {
    const { token } = req.headers
    const response = await userService.getUserByToken(token).catch((err) => {
        console.log(err)
        res.status(err.statusCode || httpStatus.UNAUTHORIZED).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})
const adminGetMe = catchAsync(async (req, res) => {
    const { token } = req.headers
    const response = await userService.getUserByToken(token).catch((err) => {
        console.log(err)
        res.status(err.statusCode || httpStatus.UNAUTHORIZED).send({ error: err })
    })
    if (response) res.status(httpStatus.CREATED).send({ response })
})

const verifyTokenAdmin = catchAsync(async (req, res, next) => {
    const { token } = req.headers
    tokenService
        .verifyToken(token, ROLE.admin.role)
        .then(() => next())
        .catch((error) => {
            res.status(httpStatus.UNAUTHORIZED).send({
                status: httpStatus.UNAUTHORIZED,
                message: error.message,
            })
        })
})

const verifyTokenUser = catchAsync(async (req, res, next) => {
    const { token } = req.headers
    tokenService
        .verifyToken(token, ROLE.user.role)
        .then(() => next())
        .catch((error) => {
            res.status(httpStatus.UNAUTHORIZED).send({
                status: httpStatus.UNAUTHORIZED,
                message: error.message,
            })
        })
})

module.exports = {
    registerUser,
    loginUserwithEmailAndPassword,
    verifyTokenAdmin,
    verifyTokenUser,
    userGetMe,
    adminGetMe,
    loginAdminwithEmailAndPassword,
}
