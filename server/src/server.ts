import express, { Express } from "express";
import { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { authRouter } from "./router/auth";
import podcastRouter from "./router/podcast";
import dotenv from "dotenv";
import { connectMongoDB } from "./db";
dotenv.config();

connectMongoDB();

//* initiate the express app
const app: Express = express();

//* use middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

const port = 8000;

app.use("/api/auth", authRouter);
app.use("/api/podcast", podcastRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
