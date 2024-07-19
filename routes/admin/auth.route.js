const express = require('express');
const controller = require('../../controllers/admin/auth.controller');

// validate
const validate = require('../../validate/admin/auth.validate');

const router = express.Router()
router.get('/logout', controller.logout);
router.post('/login', validate.loginPost, controller.loginPost);

module.exports = router;