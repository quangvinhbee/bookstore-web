const mongoose = require('mongoose')
const { tokenTypes } = require('../../configs/tokens')
const { toJSON } = require('./plugins/index')

const Schema = mongoose.Schema
const TokenSchema = Schema(
    {
        token: {
            type: String,
            require: true,
            index: true,
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            require: true,
        },
        type: {
            type: String,
            enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
        },
        expires: {
            type: Date,
            require: true,
        },
        blackListed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

TokenSchema.plugin(toJSON)
module.exports = mongoose.model('token', TokenSchema)
