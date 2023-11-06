import express from "express";
import { categoryController } from "../controller/indexController.js";

const router = express.Router();

router.get("/getAllCategory", categoryController.getAllCategoriesController); 

router.get("/getCategoryById", categoryController.getCategoryByIdController); 

router.post("/createCategory", categoryController.createCategoryController); 

router.put("/updateCategory", categoryController.updatedCategoryByIdController); 

router.delete("/deleteCategory", categoryController.deleteCategoryByIdController);  

export default router;
