const express = require('express');
const controller = require('../../controllers/client/product.controller');

const router = express.Router()
router.get('/', controller.index);

router.get('/detail/:slugProduct', controller.detail);

router.get('/:slugCategory', controller.category);

module.exports = router;