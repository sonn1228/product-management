import express from 'express';
import controller from '../../controllers/admin/auth.controller.js';
// validate
import validate from '../../validate/admin/auth.validate.js';

const router = express.Router();

router.get('/logout', controller.logout);
router.post('/login', validate.loginPost, controller.loginPost);

export default router;
