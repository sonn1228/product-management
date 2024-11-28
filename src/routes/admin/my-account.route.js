import express from 'express';
import controller from '../../controllers/admin/my-account.controller.js';
import { uploadCloud } from '../../middleware/admin/cloudUpload.middleware.js';
import multer from 'multer';

const fileUpload = multer();
const router = express.Router();

router.get('/', controller.index);
router.get('/edit', controller.edit);
router.patch('/edit', fileUpload.single('avatar'), uploadCloud, controller.editPatch);

export default router;
