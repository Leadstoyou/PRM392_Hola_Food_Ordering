import express from "express";
import { userController } from "../controller/indexController.js";

const router = express.Router();

router.post("/google", userController.userLoginByGoogle);

export default router;
