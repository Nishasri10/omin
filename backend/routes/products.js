import express from 'express';
import { 
  getProducts, 
  getProductById, 
  getProductsByCategory, 
  searchProducts, 
  getFeaturedProducts,
  getNewArrivals,
  getTopRated 
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/new-arrivals', getNewArrivals);
router.get('/top-rated', getTopRated);
router.get('/search', searchProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

export default router;