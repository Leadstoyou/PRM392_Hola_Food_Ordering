import { userRepository } from "../repository/indexRepository.js";
import { HttpStatusCode } from "axios";

const userSearchController = async (req, res) => {
  let { page = 1, size, search = "", role } = req.query;
  if (page !== undefined && isNaN(page)) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.BadRequest,
      message: "Invalid 'page' value. It should be a number.",
    });
  }

  if (size !== undefined && isNaN(size)) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.BadRequest,
      message: "Invalid 'size' value. It should be a number.",
    });
  }
  try {
    if (page !== undefined) {
      page = parseInt(page);
    }

    if (size !== undefined) {
      size = parseInt(size);
    }

    if (role !== undefined) {
      role = parseInt(role);
    }

    let filteredUsers = await userRepository.userSearchRepository({
      size,
      page,
      search,
      role,
    });

    const { total, users } = filteredUsers.data;
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: "Get search successfully",
      data: {
        size,
        page,
        search,
        role,
        total,
        data: users,
      },
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
    userAvatarUrl,
  } = req.body;

  try {
    const updatedUser = await userRepository.userUpdateProfileRepository({
      userEmail,
      userName,
      userPhoneNumber,
      userAddress,
      userAvatarUrl,
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

const userUpdateRoleController = async (req, res) => {
  const { newRole, userId } = req.body;
  try {
    const updatedUser = await userRepository.userUpdateRoleRepository({
      userId,
      newRole,
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
  userUpdateRoleController,
  userSearchController
};
