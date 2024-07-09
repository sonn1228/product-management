const express = require('express');
const controller = require('../../controllers/admin/account.controller');
const validate = require('../../validate/admin/account.validate');
// upload cloud
const middleware = require('../../middleware/admin/cloudUpload.middleware');
const multer = require('multer');
const fileUpload = multer();


const router = express.Router()
router.get('/', controller.index);
router.get('/create', controller.create);

router.post('/create', fileUpload.single('avatar'), middleware.uploadCloud, validate.createPost, controller.createPost);
router.get('/edit/:id', controller.edit);
router.delete('/delete/:id', controller.delete);
router.patch('/edit/:id', fileUpload.single('avatar'), middleware.uploadCloud, controller.editPatch);

module.exports = router;
