const express = require('express');
const { 
    createProduct, 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

const router = express.Router();

// Create a new product
router.post('/', verifyToken, isAdmin, createProduct);

// Get all products
router.get('/', verifyToken, getProducts);

// Get a product by ID
router.get('/:id', verifyToken, getProductById);

// Update a product by ID
router.put('/:id', verifyToken, isAdmin, updateProduct);

// Delete a product by ID
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

module.exports = router;