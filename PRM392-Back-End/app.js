import ConnectDB from "./util/DBContext.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { userRouter } from "./router/indexRouter.js";

dotenv.config();
const corsOptions = {
  origin: process.env.FRONT_END_ORIGIN_URL,
  credentials: true,
};
const port = process.env.PORT || 4200;
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors(corsOptions));

const v1Router = express.Router();
v1Router.use(cookieParser());
v1Router.use(express.json());
v1Router.use(bodyParser.urlencoded({ extended: false }));
v1Router.use("/auth", userRouter);
app.use("/api/v1", v1Router);

app.get("/", (req, res) => {
  res.send("Hello PRM392 Project");
});

app.listen(port, async () => {
  await ConnectDB();
  console.log(`Port: ${port}`);
});
