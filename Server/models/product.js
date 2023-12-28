const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    image_url: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    swapped: {
        type: Boolean,
        required: false
    }
})

module.exports = mongoose.model('Product', productSchema)