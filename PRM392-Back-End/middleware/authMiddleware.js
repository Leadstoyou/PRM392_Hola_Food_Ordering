import jwt from "jsonwebtoken";
import { HttpStatusCode } from "axios";
import Exception from "../constant/Exception.js";

const checkToken = (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers?.authorization.split(" ")[1];
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN,
      async (err, tokenDataDecode) => {
        if (err?.name === "JsonWebTokenError") {
          return res.status(HttpStatusCode.Ok).json({
            response: HttpStatusCode.Unauthorized,
            message: Exception.INVALID_ACCESS_TOKEN,
          });
        } else if (err instanceof jwt.TokenExpiredError) {
          res.status(HttpStatusCode.Ok).json({
            response: HttpStatusCode.Unauthorized,
            message: Exception.EXPIRED_ACCESS_TOKEN,
          });
        } else if (err) {
          return res.status(HttpStatusCode.Ok).json({
            response: HttpStatusCode.Unauthorized,
            message: Exception.INVALID_ACCESS_TOKEN,
          });
        } else {
          req.user = tokenDataDecode;
          next();
        }
      }
    );
  } else {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Unauthorized,
      message: Exception.UNAUTHORIZED_USER,
    });
  }
};

const checkPermission =
  (allowedRoles = [2]) =>
  (req, res, next) => {
    checkToken(req, res, (err) => {
      if (err) {
        console.log("error:", err);
        return res.status(err.status).json(err.body);
      }
      const userRole = req.user?.userRole;

      if (allowedRoles.includes(userRole)) {
        next();
      } else {
        return res.status(HttpStatusCode.Ok).json({
          response: HttpStatusCode.Unauthorized,
          message: Exception.PERMISSION_DENIED,
        });
      }
    });
  };

const adminMiddleware = (req, res, next) => {
  const Authorization = req?.header("Authorization");
  const token = Authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(404).json({
      status: HttpStatusCode.NotFound,
      message: "Token is required",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(404).json({
        status: HttpStatusCode.NotFound,
        message: "The authentication",
      });
    }
    if (user?.roleId === 0) {
      req.user = user;
      next();
    } else {
      return res.status(404).json({
        status: HttpStatusCode.NotFound,
        message: "Access denied",
      });
    }
  });
};

const checkUser = (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers?.authorization.split(" ")[1];
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN,
      async (err, tokenDataDecode) => {
        if (err) {
          next();
        }
        req.user = tokenDataDecode;
        next();
      }
    );
  } else {
    next();
  }
};

export { checkToken, checkUser, checkPermission, adminMiddleware };
