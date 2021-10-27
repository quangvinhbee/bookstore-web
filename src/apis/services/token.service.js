const jwt = require('jsonwebtoken')
const moment = require('moment')
const { tokenTypes } = require('../../configs/tokens')
const { ROLE } = require('../../constants/auth')

const { Token } = require('../models/index')

const generateAuthToken = async (user) => {
    const accessTokenExpires = moment().add(process.env.JWT_EXPIRES / 60, 'minutes')
    const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS, user.role)

    const refreshTokenExpires = moment().add(process.env.JWT_EXPIRES / 60, 'minutes')
    const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH, user.role)
    await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH)
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    }
}

const generateToken = (
    userId,
    expires,
    type,
    role = ROLE.user.role,
    secret = process.env.SECRET_KEY
) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    }
    return jwt.sign(payload, secret + role)
}

const getToken = async (token) => {
    return await Token.findOne({
        token: token,
    })
}

const getTokenByRefresh = async (refreshToken, isBlackListed) => {
    const refreshTokenDoc = await Token.findOne({
        token: refreshToken,
        type: tokenTypes.REFRESH,
        blacklisted: isBlackListed,
    })
    return refreshTokenDoc
}

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
    })
    return tokenDoc
}

const verifyToken = async (token, role = ROLE.user.role, secret = process.env.SECRET_KEY) => {
    try {
        jwt.verify(token, secret + role)
        return true
    } catch (err) {
        throw err
    }
}

module.exports = {
    generateAuthToken,
    generateToken,
    getTokenByRefresh,
    verifyToken,
    getToken,
}
