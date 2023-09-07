import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { authRouter } from "./router/auth";

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(compression());

const port = 8000;

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
