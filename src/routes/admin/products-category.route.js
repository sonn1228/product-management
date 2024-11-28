import express from 'express';
import controller from '../../controllers/admin/products-category.controller.js';
import { uploadCloud } from '../../middleware/admin/cloudUpload.middleware.js';
import validate from '../../validate/admin/product-category.validate.js';
import multer from 'multer';

const fileUpload = multer();
const router = express.Router();

router.get('/', controller.index);
router.delete('/delete/:id', controller.deleteCategory);
router.get('/create', controller.create);
router.post('/create', fileUpload.single('thumbnail'), uploadCloud, validate.createPost, controller.createPost);
router.get('/edit/:id', controller.edit);
router.patch('/edit/:id', fileUpload.single('thumbnail'), uploadCloud, validate.createPost, controller.editPatch);
router.get('/detail/:id', controller.detail);

export default router;
