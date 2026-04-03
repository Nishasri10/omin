const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    barcode: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;