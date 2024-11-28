import express from 'express';
import controller from '../../controllers/client/product.controller.js';

const router = express.Router();

router.get('/', controller.index);
router.get('/detail/:slugProduct', controller.detail);
router.get('/:slug', controller.category);

export default router;
