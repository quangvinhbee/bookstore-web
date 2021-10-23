const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { userService, authService, tokenService } = require('../services')

const registerUser = catchAsync(async (req, res) => {
    const respone = await userService
        .createUser(req.body)
        .catch((err) => res.status(err.statusCode).send(err))
    res.status(httpStatus.CREATED).send({ respone })
})

const loginUserwithEmailAndPassword = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const respone = await authService
        .loginUserwithEmailAndPassword(email, password)
        .catch((err) => res.status(err.statusCode).send(err))
    const tokens = await tokenService.generateAuthToken(respone)
    res.status(httpStatus.ACCEPTED).send({ respone, tokens })
})

module.exports = { registerUser, loginUserwithEmailAndPassword }
