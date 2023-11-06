import { OAuth2Client } from "google-auth-library";
import config from "../config/config.js";
import { userRepository } from "../repository/indexRepository.js";
import Exception from "../constant/Exception.js";
import { HttpStatusCode } from "axios";
import jwtService from "../service/jwtService.js";
import bcrypt from "bcrypt";

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
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.Unauthorized,
        message: "Token đã hết hạn",
      });
    }

    if (userId) {
      const user = await userRepository.userLoginByGoogle(payload.email);
      if (!user.success && user.message === Exception.CANNOT_FIND_USER) {
        const newUserRegistered = await userRepository.userRegisterByGoogle({
          userName: payload.name,
          userEmail: payload.email,
          userAvatarUrl: payload.picture,
        });

        console.log(
          "debug1",
          newUserRegistered.data._id,
          newUserRegistered.data.roleId
        );
        const accessToken = jwtService.generalAccessToken(
          newUserRegistered.data._id,
          newUserRegistered.data.roleId
        );

        return res.status(HttpStatusCode.Created).json({
          response: HttpStatusCode.Created,
          message: newUserRegistered.message,
          data: newUserRegistered.data,
          accessToken,
        });
      }

      console.log("debug1", user.data._id, user.data.roleId);
      const accessToken = jwtService.generalAccessToken(
        user.data._id,
        user.data.roleId
      );

      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.Ok,
        message: user.message,
        data: user.data,
        accessToken,
      });
    } else {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.Unauthorized,
        message: Exception.CANNOT_FIND_USER,
      });
    }
  } catch (error) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.InternalServerError,
      message: error.message,
    });
  }
};

const userLoginByLocal = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;


    const user = await userRepository.userLoginByLocal({
      userEmail,
      userPassword,
    });

    if (!user.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.Unauthorized,
        message: user.message,
      });
    }
    const accessToken = jwtService.generalAccessToken(
      user.data._id,
      user.data.roleId
    );

    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: user.message,
      data: user.data,
      accessToken,
    });
  } catch (error) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.InternalServerError,
      message: error.message,
    });
  }
};

const userRegisterByLocal = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userAddress, userPhoneNumber } =
      req.body;

    const hashedPassword = await bcrypt.hash(
      userPassword,
      parseInt(process.env.SALT_ROUNDS)
    );
    const user = await userRepository.userRegisterByLocal({
      userName,
      userEmail,
      userPassword:hashedPassword,
      userAddress,
      userPhoneNumber,
    });

    if (!user.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: user.message,
      });
    }
    return res
      .status(HttpStatusCode.Ok)
      .json({ response: HttpStatusCode.Ok, data: user.data });
  } catch (error) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.InternalServerError,
      message: error.message,
    });
  }
};

export default {
  userLoginByGoogle,
  userLoginByLocal,
  userRegisterByLocal,
};
