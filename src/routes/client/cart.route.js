import express from "express";
import controller from "../../controllers/client/cart.controller.js";

const router = express.Router();

router.get("/", controller.index);
router.post("/add/:productId", controller.addPost);
router.get("/delete/:productId", controller.deleteItem);
router.get("/update/:productId/:quantity", controller.updateItem);

export default router;
