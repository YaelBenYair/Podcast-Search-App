import { Router } from "express";
import { Request, Response } from "express";

export const authRouter: Router = Router();

authRouter.get("/", (req: Request, res: Response) => {
  console.log(req);
  console.log(`This is a test ${req.query.test}`);
  res.send(`This is an auth router ${req.query.test}`);
});
