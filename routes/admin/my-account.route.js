const express = require('express');
const controller = require('../../controllers/admin/my-account.controller');
const router = express.Router();
// upload cloud
const middleware = require('../../middleware/admin/cloudUpload.middleware');
const multer = require('multer');
const fileUpload = multer();


router.get('/', controller.index);
router.get('/edit', controller.edit);
router.patch('/edit', fileUpload.single('avatar'), middleware.uploadCloud, controller.editPatch);

module.exports = router;