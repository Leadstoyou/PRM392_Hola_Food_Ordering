import express from "express";
import { productController } from "../controller/indexController.js";
const router = express.Router();
router.post("/create", productController.createProduct);
router.put("/update/:id", productController.updateProduct);
router.get("/get-all", productController.getAllProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.get("/get/:id", productController.getDetailProduct);
export default router;
