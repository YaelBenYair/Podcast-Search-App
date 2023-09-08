import {
  NextFunction,
  Request,
  RequestHandler,
  RequestParamHandler,
  Response,
} from "express";
import jwt from "jsonwebtoken";
import { AuthorizedRequest } from "../interfaces/authInterface";

export default function auth(
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
): any {
  const headers = req.headers as any;

  let tokenHeader = headers.authorization as string;
  if (!tokenHeader) {
    return next("Unauthorized request");
  }

  const token = tokenHeader.split("Bearer ")[1];

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET as any) as any;
    req.user = decoded;
    next();
  } catch (e: any) {
    return next(e.message);
  }
}
