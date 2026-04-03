const Product = require('../models/Product');

// Create a new product
const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

// Get all products
const getAllProducts = async () => {
    return await Product.find();
};

// Get a product by ID
const getProductById = async (id) => {
    return await Product.findById(id);
};

// Update a product by ID
const updateProduct = async (id, productData) => {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
};

// Delete a product by ID
const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

// Search products by barcode
const searchProductByBarcode = async (barcode) => {
    return await Product.findOne({ barcode });
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProductByBarcode,
};