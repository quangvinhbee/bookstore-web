const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')
const Schema = mongoose.Schema
const CategorySchema = Schema(
    {
        title: {
            type: String,
            require: true,
        },
        image: {
            type: URL,
        },
    },
    {
        timestamps: true,
    }
)

CategorySchema.plugin(toJSON)
CategorySchema.plugin(paginate)

module.exports = mongoose.model('book', CategorySchema)
