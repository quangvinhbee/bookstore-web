const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BookShema = Schema({
    title: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
    },
})
