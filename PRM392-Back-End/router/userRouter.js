import express from "express";
import { userController } from "../controller/indexController.js";
import { adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getUser", userController.userSearchController); //done

router.get("/forgotPassword", userController.userForgotPasswordController); //done

router.put("/resetPassword", userController.userResetPasswordController); //done

router.put("/changePassword", userController.userChangePasswordController); //done

router.get("/viewProfile", userController.userViewProfileController); // done

router.put("/updateProfile", userController.userUpdateProfileController); //done

router.put("/updateRole",adminMiddleware, userController.userUpdateRoleController); //done

export default router;
