const jwt = require('jsonwebtoken')
const moment = require('moment')
const { tokenTypes } = require('../../configs/tokens')

const { Token } = require('../models/index')

const generateAuthToken = async (user) => {
    const accessTokenExpires = moment().add(process.env.JWT_EXPIRES / 60, 'minutes')
    const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS)

    const refreshTokenExpires = moment().add(process.env.JWT_EXPIRES / 60, 'minutes')
    const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH)
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

const generateToken = (userId, expires, type, secret = process.env.SECRET_KEY) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    }
    return jwt.sign(payload, secret)
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

module.exports = {
    generateAuthToken,
    generateToken,
    getTokenByRefresh,
}
