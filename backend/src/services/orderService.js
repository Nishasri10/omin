const Order = require('../models/Order');

// Create a new order
const createOrder = async (orderData) => {
    const order = new Order(orderData);
    return await order.save();
};

// Get all orders
const getAllOrders = async () => {
    return await Order.find().populate('user products');
};

// Get order by ID
const getOrderById = async (orderId) => {
    return await Order.findById(orderId).populate('user products');
};

// Update an order
const updateOrder = async (orderId, updateData) => {
    return await Order.findByIdAndUpdate(orderId, updateData, { new: true });
};

// Delete an order
const deleteOrder = async (orderId) => {
    return await Order.findByIdAndDelete(orderId);
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};