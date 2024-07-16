const express = require("express");
const router = express.Router();

// upload cloud
const middleware = require('../../middleware/admin/cloudUpload.middleware');
const multer = require('multer');
const fileUpload = multer();

const controller = require("../../controllers/admin/setting.controller");

router.get("/general", controller.general);

router.patch("/general", fileUpload.single('logo'), middleware.uploadCloud, controller.generalPatch);

module.exports = router;