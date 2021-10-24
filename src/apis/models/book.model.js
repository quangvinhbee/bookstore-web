const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')
const Schema = mongoose.Schema
const BookShema = Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        authorId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Author',
            required: true,
        },
        categoryId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Category',
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

BookShema.plugin(toJSON)
BookShema.plugin(paginate)

module.exports = mongoose.model('book', BookShema)
