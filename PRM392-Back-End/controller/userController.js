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
    if (expirationTime < currentTime ) {
      res
        .status(HttpStatusCode.Ok)
        .json({
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
        res
          .status(HttpStatusCode.Created)
          .json({
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

export default { userLoginByGoogle };
