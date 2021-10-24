const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const Schema = mongoose.Schema

const AuthorSchema = Schema(
    {
        displayName: {
            type: String,
            trim: true,
            require: true,
        },
        birthday: {
            type: Date,
        },
        deathday: {
            type: Date,
        },
        address: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)
AuthorSchema.plugin(toJSON)
AuthorSchema.plugin(paginate)

module.exports = mongoose.model('author', AuthorSchema)
