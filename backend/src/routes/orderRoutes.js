const express = require('express');
const { createOrder, getOrders, getOrderById } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin, isManager, isCashier } = require('../middleware/roleMiddleware');

const router = express.Router();

// Create a new order
router.post('/', verifyToken, isCashier, createOrder);

// Get all orders
router.get('/', verifyToken, isManager, getOrders);

// Get order by ID
router.get('/:id', verifyToken, isManager, getOrderById);

module.exports = router;