import express from 'express';
import multer from 'multer';
import { uploadCloud } from '../../middleware/admin/cloudUpload.middleware.js';
import controller from '../../controllers/admin/setting.controller.js';

const fileUpload = multer();
const router = express.Router();

router.get('/general', controller.general);
router.patch('/general', fileUpload.single('logo'), uploadCloud, controller.generalPatch);

export default router;
