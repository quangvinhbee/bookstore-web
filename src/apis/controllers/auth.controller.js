const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { userService, authService, tokenService } = require('../services')
const { ROLE } = require('../../constants/auth')

const registerUser = catchAsync(async (req, res) => {
    const respone = await userService.createUser(req.body).catch((err) => {
        res.status(err.statusCode).send({ error: err })
    })
    if (respone) res.status(httpStatus.CREATED).send({ respone })
})

const loginUserwithEmailAndPassword = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const respone = await authService
        .loginUserwithEmailAndPassword(email, password)
        .catch((err) => res.status(err.statusCode).send(err))
    const tokens = await tokenService.generateAuthToken(respone)
    res.status(httpStatus.ACCEPTED).send({ respone, tokens })
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

module.exports = { registerUser, loginUserwithEmailAndPassword, verifyTokenAdmin }
