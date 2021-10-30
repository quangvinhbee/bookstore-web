const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')
const Schema = mongoose.Schema
const BookShema = Schema(
    {
        name: {
            type: String,
            trim: true,
            require: true,
        },
        price: {
            type: Number,
            required: true,
        },
        author: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'author',
            required: true,
        },
        category: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'category',
        },
        version: {
            type: String,
        },
        image: {
            type: String,
        },
        publishedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
)
BookShema.index({ '$**': 'text' })
BookShema.plugin(toJSON)
BookShema.plugin(paginate)

module.exports = mongoose.model('book', BookShema)
