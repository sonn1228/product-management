const express = require('express');
const controller = require('../../controllers/admin/my-account.controller');
const router = express.Router();


router.get('/', controller.index);
router.get('/edit', controller.edit);

module.exports = router;