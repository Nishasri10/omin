import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { syncOffline } from '../controllers/syncController.js';

const router = express.Router();
router.use(protect);
router.post('/', syncOffline);
export default router;
