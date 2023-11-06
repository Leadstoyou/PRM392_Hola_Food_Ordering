import express from "express";
import { productController } from "../controller/indexController.js";
import { adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", adminMiddleware, productController.createProduct);

router.put("/update/:id", adminMiddleware, productController.updateProduct);

router.get("/get-all", productController.getAllProduct);

router.delete("/delete/:id", adminMiddleware, productController.deleteProduct);

router.get("/get/:id", productController.getDetailProduct);
export default router;
