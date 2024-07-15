const express = require("express");
const router = express.Router();

// validate
const validate = require('../../validate/client/user.validate');
// controller
const controller = require("../../controllers/client/user.controller");

router.get("/register", controller.register);

router.post("/register", validate.registerPost, controller.registerPost);

// router.get("/login", controller.login);

// router.post("/login", controller.loginPost);

// router.get("/logout", controller.logout);

// router.get("/password/forgot", controller.forgotPassword);

// router.post("/password/forgot", controller.forgotPasswordPost);

// router.get("/password/otp", controller.otpPassword);

// router.post("/password/otp", controller.otpPasswordPost);

// router.get("/password/reset", controller.resetPassword);

// router.post("/password/reset", controller.resetPasswordPost);

// router.get("/info", authMiddleware.requireAuth, controller.info);

module.exports = router;