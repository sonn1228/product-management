import express from 'express';
import controller from '../../controllers/admin/account.controller.js';
import validate from '../../validate/admin/account.validate.js';
// upload cloud
import { uploadCloud } from '../../middleware/admin/cloudUpload.middleware.js';
import multer from 'multer';

const fileUpload = multer();
const router = express.Router();

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', fileUpload.single('avatar'), uploadCloud, validate.createPost, controller.createPost);
router.get('/edit/:id', controller.edit);
router.delete('/delete/:id', controller.deleteAccount);
router.patch('/edit/:id', fileUpload.single('avatar'), uploadCloud, controller.editPatch);

export default router;
