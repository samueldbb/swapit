const mongoose = require('mongoose')

const swapSchema = new mongoose.Schema({
    user_sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user_receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product_sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    product_receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    status: {
        type: String,
        required: false,
    },
})

module.exports = mongoose.model('Swap', swapSchema)