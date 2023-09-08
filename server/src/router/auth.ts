import { Router } from "express";
import { Request, Response } from "express";
import auth from "../middelwares/authMiddleware";
import { AuthorizedRequest } from "../interfaces/authInterface";
import { getMe, postGetToken, postSignup } from "../controllers/authController";

export const authRouter: Router = Router();

authRouter.get("/me", auth as any, getMe as any);

authRouter.post("/signin", postGetToken);
authRouter.post("/signup", postSignup);
