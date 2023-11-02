import express from "express";
import { discountController } from "../controller/indexController.js";

const router = express.Router();

router.get("/getAllDiscount", discountController.getAllDiscountController); 

router.get("/getDiscountById", discountController.getDiscountByIdController); 

router.post("/createDiscount", discountController.createDiscountController); 

router.put("/updateDiscount", discountController.updatedDiscountByIdController); 

router.delete("/deleteDiscount", discountController.deleteDiscountByIdController);  

export default router;
