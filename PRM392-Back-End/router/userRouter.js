import express from "express";
import { userController } from "../controller/indexController.js";

const router = express.Router();

router.get("/forgotPassword", userController.userForgotPasswordController); //done

router.put("/resetPassword", userController.userResetPasswordController); //done

router.put("/changePassword", userController.userChangePasswordController); //done

router.get("/viewProfile", userController.userViewProfileController); // done

router.put("/updateProfile", userController.userUpdateProfileController); //done

export default router;
