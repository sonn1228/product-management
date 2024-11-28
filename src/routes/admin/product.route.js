import express from 'express';
import controller from '../../controllers/admin/product.controller.js';
import validate from '../../validate/admin/product.validate.js';
import { uploadCloud } from '../../middleware/admin/cloudUpload.middleware.js';
import multer from 'multer';

const fileUpload = multer();
const router = express.Router();

router.get('/', controller.index);
router.get('/detail/:id', controller.detail);
router.delete('/delete/:id', controller.deleteProduct);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);
router.get('/create', controller.create);
router.post('/create', fileUpload.single('thumbnail'), uploadCloud, validate.createPost, controller.createPost);
router.get('/edit/:id', controller.edit);
router.patch('/edit/:id', fileUpload.single('thumbnail'), uploadCloud, validate.createPost, controller.editPatch);

export default router;
