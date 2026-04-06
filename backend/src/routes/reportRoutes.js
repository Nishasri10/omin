import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { salesSummary, inventorySummary } from '../controllers/reportController.js';

const router = express.Router();
router.use(protect);
router.get('/sales', salesSummary);
router.get('/inventory', inventorySummary);
export default router;
