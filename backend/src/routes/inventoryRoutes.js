import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { listInventory, adjustInventory, createInventory } from '../controllers/inventoryController.js';

const router = express.Router();
router.use(protect);
router.get('/', listInventory);
router.post('/', authorize('manager', 'super_admin'), createInventory);
router.put('/:id', authorize('manager', 'super_admin'), adjustInventory);
export default router;
