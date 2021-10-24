const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')
const Schema = mongoose.Schema
const BookShema = Schema(
    {
        title: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        authorId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Author',
            require: true,
        },
        version: {
            type: String,
        },
        image: {
            type: URL,
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
