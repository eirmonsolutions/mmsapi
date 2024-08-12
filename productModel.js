// models/productModel.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    department: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
