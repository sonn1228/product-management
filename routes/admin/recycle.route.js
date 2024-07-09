const express = require('express');
const controller = require('../../controllers/admin/recycle.controller');
const router = express.Router();


router.get('/products', controller.products);
router.delete('/products/delete/:id', controller.deleteProduct);
router.patch('/products/restore/:id', controller.restoreProduct);

module.exports = router;