const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const Schema = mongoose.Schema

const AuthorSchema = Schema(
    {
        name: {
            type: String,
            trim: true,
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
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)
AuthorSchema.index({ name: 'text' })
AuthorSchema.plugin(toJSON)
AuthorSchema.plugin(paginate)

module.exports = mongoose.model('author', AuthorSchema)
