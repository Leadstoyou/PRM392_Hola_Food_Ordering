import express from "express";
import { authController } from "../controller/indexController.js";


const router = express.Router();

router.post("/google/login", authController.userLoginByGoogle);

router.post("/local/login",authController.userLoginByLocal);

router.post("/local/register",authController.userRegisterByLocal);

export default router;
