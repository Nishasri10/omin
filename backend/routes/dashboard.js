import express from 'express';
import { getStats, getRecentOrders, getSalesData, getInventoryStatus } from '../controllers/dashboardController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', auth, getStats);
router.get('/recent-orders', auth, getRecentOrders);
router.get('/sales-data', auth, getSalesData);
router.get('/inventory', auth, getInventoryStatus);

export default router;