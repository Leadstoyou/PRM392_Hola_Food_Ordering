import express from "express";
import { userController } from "../controller/indexController.js";

const router = express.Router();

router.get("/forgotPassword", userController.userForgotPasswordController);

router.put("/resetPassword", userController.userResetPasswordController);

router.put("/changePassword", userController.userChangePasswordController);

router.get("/viewProfile", userController.userViewProfileController); // ok

router.get("/viewProfileDetail", userController.userViewProfileDetailController);

router.put("/updateProfile", userController.userUpdateProfileController);

export default router;
