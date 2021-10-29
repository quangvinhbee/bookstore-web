const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')
const Schema = mongoose.Schema
const CategorySchema = Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)
CategorySchema.index({ '$**': 'text' })
CategorySchema.plugin(toJSON)
CategorySchema.plugin(paginate)

module.exports = mongoose.model('category', CategorySchema)
