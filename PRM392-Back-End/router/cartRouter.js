import express from "express";
import { cartController } from "../controller/indexController.js";
const router = express.Router();
router.post("/add-to-cart", cartController.addToCart);

export default router;
