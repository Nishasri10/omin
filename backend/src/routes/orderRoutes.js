import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createOrder, listOrders } from '../controllers/orderController.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();
router.use(protect);
router.post('/', authorize('cashier', 'manager', 'super_admin'), createOrder);
router.get('/', authorize('cashier', 'manager', 'super_admin'), listOrders);
export default router;
