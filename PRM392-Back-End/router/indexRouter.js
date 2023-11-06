import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import categoryRouter from "./categoryRouter.js";
import feedbackRouter from "./feedbackRouter.js";
import discountRouter from "./discountRouter.js";
import orderRouter from "./orderRouter.js";
import cartRouter from "./cartRouter.js";
import routeUnknown from "../middleware/routeMiddleware.js";
const routes = (app) => {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/product", productRouter);
  app.use("/category", categoryRouter);
  app.use("/feedback", feedbackRouter);
  app.use("/discount", discountRouter);
  app.use("/order", orderRouter);
  app.use("/cart", cartRouter);
  app.use(routeUnknown)
};

export default routes;
