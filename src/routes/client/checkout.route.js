import express from "express";
import controller from "../../controllers/client/checkout.controller.js";

const router = express.Router();

router.get("/", controller.index);
router.post("/order", controller.order);
router.get("/success/:orderId", controller.success);

export default router;
