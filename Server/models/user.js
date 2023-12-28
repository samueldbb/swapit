const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    surname: {
        type: String,
        required: false
    },
    date_of_birth: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    localization: {
        type: String,
        required: false
    },
    profile_image_url: {
        type: String,
        required: false
    },
    last_seen_product: {
        type: Number,
        required: false
    },
    products_user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }],
    products_liked_user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }],
    swaps_list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Swaps'
    },
    product_to_swap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },


})

module.exports = mongoose.model('User', userSchema)