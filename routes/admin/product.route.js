const express = require('express');
const controller = require('../../controllers/admin/product.controller');
const validate = require('../../validate/admin/product.validate');

// upload cloud
const middleware = require('../../middleware/admin/cloudUpload.middleware');
const multer = require('multer');
const fileUpload = multer();



const router = express.Router()
router.get('/', controller.index);

router.get('/detail/:id', controller.detail);

router.delete('/delete/:id', controller.delete);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.get('/create', controller.create);

router.post('/create', fileUpload.single('thumbnail'), middleware.uploadCloud, validate.createPost, controller.createPost);

// Không sử dụng middleware multer: Khi không có multer, Express không biết cách xử lý form có enctype="multipart/form-data"
// => req.body = {}


router.get('/edit/:id', controller.edit);
router.patch('/edit/:id', fileUpload.single('thumbnail'), middleware.uploadCloud, validate.createPost, controller.editPatch);


module.exports = router;