import express from "express";
import { orderController } from "../controller/indexController.js";
import { adminMiddleware, checkUser } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/create", checkUser, orderController.createOrder);
router.put("/update/:id", adminMiddleware, orderController.changeStatus);
router.get("/get-all", adminMiddleware, orderController.getAllOrder);
router.get("/get/:id", checkUser, orderController.getOrderByUserId);
export default router;
