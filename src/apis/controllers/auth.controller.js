const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { userService, authService } = require('../services')

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
    res.status(httpStatus.ACCEPTED).send({ respone })
})

module.exports = { registerUser, loginUserwithEmailAndPassword }
