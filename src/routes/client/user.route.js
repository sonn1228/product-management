import express from "express";
import validate from '../../validate/client/user.validate.js';
import controller from "../../controllers/client/user.controller.js";
import authMiddleware from '../../middleware/client/auth.middleware.js';

const router = express.Router();

router.get("/register", controller.register);
router.post("/register", validate.registerPost, controller.registerPost);
router.get("/login", controller.login);
router.post("/login", controller.loginPost);
router.get("/logout", controller.logout);
router.get("/password/forgot", controller.forgotPassword);
router.post("/password/forgot", controller.forgotPasswordPost);
router.get("/password/otp", controller.otpPassword);
// router.post("/password/otp", controller.otpPasswordPost);
// router.get("/password/reset", controller.resetPassword);
// router.post("/password/reset", validate.resetPasswordPost, controller.resetPasswordPost);
// router.get("/info", authMiddleware.requireAuth, controller.info);

export default router;
