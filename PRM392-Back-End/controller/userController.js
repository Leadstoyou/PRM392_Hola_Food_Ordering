import { OAuth2Client } from "google-auth-library";
import config from "../config/config.js";
import { userRepository } from "../repository/indexRepository.js";
import Exception from "../constant/Exception.js";
import { HttpStatusCode } from "axios";

const client = new OAuth2Client(config.client_id.key);
const userLoginByGoogle = async (req, res) => {
  const idToken = req.headers.authorization;
  console.log(idToken);
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: config.client_id.key,
    });

    const payload = ticket.getPayload();
    const userId = payload.sub;
    const expirationTime = payload.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    if (expirationTime < currentTime) {
      res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.Unauthorized,
        message: "Token đã hết hạn",
      });
      return;
    }

    if (userId) {
      const user = await userRepository.userLoginByGoogle(payload.email);
      if (!user.success && user.message === Exception.CANNOT_FIND_USER) {
        const newUserRegistered = await userRepository.userRegisterByGoogle({
          username: payload.name,
          email: payload.email,
          avatarImgUrl: payload.picture,
        });
        res.status(HttpStatusCode.Created).json({
          response: HttpStatusCode.Created,
          data: newUserRegistered.data,
        });
        return;
      }
      res
        .status(HttpStatusCode.Ok)
        .json({ response: HttpStatusCode.Ok, data: user.data });
      return;
    } else {
      res
        .status(HttpStatusCode.Ok)
        .json({ response: HttpStatusCode.Unauthorized });
      return;
    }
  } catch (error) {
    res
      .status(HttpStatusCode.Ok)
      .json({ response: HttpStatusCode.Unauthorized });
    return;
  }
};

const userForgotPasswordController = async (req, res) => {
  const { userEmail } = req.query;
  if (!userEmail) {
    return res.status(HttpStatusCode.Unauthorized).json({
      status: "ERROR",
      message: "Missing email!",
    });
  }
  try {
    const forgotPasswordUser =
      await userRepository.userForgotPasswordRepository(userEmail);
    if (!forgotPasswordUser.success) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: "ERROR",
        message: forgotPasswordUser.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      status: "OK",
      message: forgotPasswordUser.message,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.InternalServerError).json({
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userResetPasswordController = async (req, res) => {
  const { newPassword, userPasswordResetToken } = req.body;
  if (!newPassword) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      status: "ERROR",
      message: "Missing password",
    });
  }
  if (!userPasswordResetToken) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      status: "ERROR",
      message: "Invalid Token",
    });
  }

  try {
    const result = await userRepository.userResetPasswordRepository(
      userPasswordResetToken,
      newPassword
    );
    if (!result.success) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        status: "ERROR",
        message: result.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: result.message,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userChangePasswordController = async (req, res) => {
  const { userEmail, oldPassword, newPassword, confirmPassword } = req.body;
  const errors = validationResult(req);
  if (newPassword !== confirmPassword) {
    return res.status(HttpStatusCode.Unauthorized).json({
      status: "ERROR",
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
      return res.status(HttpStatusCode.BadRequest).json({
        status: "ERROR",
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      status: "OK",
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

const userViewProfileController = async (req, res) => {
  const {userEmail} = req.body;
  try {
    const userInfo = await userRepository.userViewProfileRepository(userEmail);
    if (!userInfo.success) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: "ERROR",
        message: userInfo.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      status: "OK",
      message: userInfo.message,
      data: userInfo.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.InternalServerError).json({
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userViewProfileDetailController = async (req, res) => {
  const {userEmail} = req.body;
  try {
    const userInfo = await userRepository.userViewProfileDetailRepository(
      userEmail
    );
    if (!userInfo.success) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: "ERROR",
        message: userInfo.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      status: "OK",
      message: userInfo.message,
      data: userInfo.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.InternalServerError).json({
      status: "ERROR",
      message: exception.message,
    });
  }
};

const userUpdateProfileController = async (req, res) => {
  const {
    userEmail,
    userName,
    userPhoneNumber,
    userGender,
    userAddress,
    userAge,
    userAvatar,
  } = req.body;

  try {
    const updatedUser = await userRepository.userUpdateProfileRepository({
      userEmail,
      userName,
      userPhoneNumber,
      userGender,
      userAddress,
      userAge,
      userAvatar,
    });

    if (!updatedUser) {
      return res.status(HttpStatusCode.NotFound).json({
        status: "ERROR",
        message: updatedUser.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      status: "OK",
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
  userLoginByGoogle,
  userForgotPasswordController,
  userResetPasswordController,
  userChangePasswordController,
  userViewProfileController,
  userViewProfileDetailController,
  userUpdateProfileController
};
