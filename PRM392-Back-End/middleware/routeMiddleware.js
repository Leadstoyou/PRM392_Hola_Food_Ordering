import { HttpStatusCode } from "axios";

const routeUnknown = (req, res, next) => {
  res.status(HttpStatusCode.BadRequest).json({ message: "Route not found" });
  next();
};

export default routeUnknown;
