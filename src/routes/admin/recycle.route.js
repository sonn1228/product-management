import express from 'express';
import controller from '../../controllers/admin/recycle.controller.js';

const router = express.Router();

router.get('/products', controller.products);
router.delete('/products/delete/:id', controller.deleteProduct);
router.patch('/products/restore/:id', controller.restoreProduct);

export default router;
