const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    productCategory: {
        type: String,
        required: false
    }
});

module.exports = Product = mongoose.model('products', ProductSchema);