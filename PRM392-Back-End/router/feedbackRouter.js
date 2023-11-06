import express from "express";
import { feedbackController } from "../controller/indexController.js";

const router = express.Router();

router.get("/getAllFeedback", feedbackController.getAllFeedbackController); 

router.get("/getFeedbackByUser", feedbackController.getFeedbackByUserIdController);

router.get("/getFeedbackByProduct", feedbackController.getFeedbackByProductIdController); 

router.post("/createFeedback", feedbackController.createFeedbackByUserController); 

router.put("/updateFeedback", feedbackController.updatedFeedbackByUserController); 

router.delete("/deleteFeedback", feedbackController.deleteFeedbackByUserController);  

export default router;
