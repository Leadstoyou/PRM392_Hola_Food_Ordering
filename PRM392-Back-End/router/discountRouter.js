import express from "express";
import { discountController } from "../controller/indexController.js";

const router = express.Router();

router.get("/getAllDiscount", discountController.getAllDiscountController); 

// router.get("/getDiscountById", discountController.getCategoryByIdController); 

// router.post("/createDiscount", discountController.createCategoryController); 

// router.put("/updateDiscount", discountController.updatedCategoryByIdController); 

// router.delete("/deleteDiscount", discountController.deleteCategoryByIdController);  

export default router;
