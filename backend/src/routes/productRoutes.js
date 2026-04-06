import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { listProducts, createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();
router.use(protect);
router.get('/', listProducts);
router.post('/', authorize('manager', 'super_admin'), createProduct);
router.get('/:id', getProduct);
router.put('/:id', authorize('manager', 'super_admin'), updateProduct);
router.delete('/:id', authorize('manager', 'super_admin'), deleteProduct);
export default router;
