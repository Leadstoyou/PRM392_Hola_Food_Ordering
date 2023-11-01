import { userRepository } from "../repository/indexRepository.js";
import { HttpStatusCode } from "axios";

const userForgotPasswordController = async (req, res) => {
  const { userEmail } = req.query;
  if (!userEmail) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Unauthorized,
      message: "Missing email!",
    });
  }
  try {
    const forgotPasswordUser =
      await userRepository.userForgotPasswordRepository(userEmail);
    if (!forgotPasswordUser.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: forgotPasswordUser.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: forgotPasswordUser.message,
    });
  } catch (error) {
    return res
      .status(HttpStatusCode.Ok)
      .json({
        response: HttpStatusCode.InternalServerError,
        message: error.message,
      });
  }
};

const userResetPasswordController = async (req, res) => {
  const { newPassword, resetPasswordOTP } = req.body;
  if (!newPassword) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Unauthorized,
      message: "Missing password",
    });
  }

  if (!resetPasswordOTP) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Unauthorized,
      message: "Invalid Token",
    });
  }

  try {
    const result = await userRepository.userResetPasswordRepository(
      resetPasswordOTP,
      newPassword
    );
    if (!result.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: result.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      status: "OK",
      message: result.message,
    });
  } catch (error) {
    return res
      .status(HttpStatusCode.Ok)
      .json({
        response: HttpStatusCode.InternalServerError,
        message: error.message,
      });
  }
};

const userChangePasswordController = async (req, res) => {
  const { userEmail, oldPassword, newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Unauthorized,
      message: "Password and confirm password do not match.",
    });
  }
  try {
    const updatedUser = await userRepository.userChangePasswordRepository({
      userEmail,
      oldPassword,
      newPassword,
    });
    if (!updatedUser.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (error) {
    return res
      .status(HttpStatusCode.Ok)
      .json({
        response: HttpStatusCode.InternalServerError,
        message: error.message,
      });
  }
};

const userViewProfileController = async (req, res) => {
  const { userEmail } = req.query;
  try {
    const userInfo = await userRepository.userViewProfileRepository(userEmail);
    if (!userInfo.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: userInfo.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: userInfo.message,
      data: userInfo.data,
    });
  } catch (error) {
    return res
      .status(HttpStatusCode.Ok)
      .json({
        response: HttpStatusCode.InternalServerError,
        message: error.message,
      });
  }
};

const userUpdateProfileController = async (req, res) => {
  const {
    userEmail,
    userName,
    userPhoneNumber,
    userAddress,
    userAvatar,
  } = req.body;

  try {
    const updatedUser = await userRepository.userUpdateProfileRepository({
      userEmail,
      userName,
      userPhoneNumber,
      userAddress,
      userAvatar,
    });

    if (!updatedUser) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.NotFound,
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: updatedUser.message,
      data: updatedUser.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.InternalServerError).json({
      status: "ERROR",
      message: exception.message,
    });
  }
};

export default {
  userForgotPasswordController,
  userResetPasswordController,
  userChangePasswordController,
  userViewProfileController,
  userUpdateProfileController,
};
