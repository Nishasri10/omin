import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrderStatus, getUserOrders } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getOrders);
router.get('/my-orders', auth, getUserOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/status', auth, updateOrderStatus);

export default router;