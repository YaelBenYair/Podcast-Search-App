import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthorizedRequest } from "../interfaces/authInterface";

export default function admin(
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) {
  const headers = req.headers as any;
  console.log(req.headers);
  let tokenHeader = headers.authorization as string;
  if (!tokenHeader) {
    return next("Unauthorized request");
  }

  const token = tokenHeader.split("Bearer ")[1];

  // const token = req.headers.get("Authorization");
  // if (!token) {
  //   return next("Unauthorized request");
  // }
  try {
    const decoded: any = jwt.decode(token, process.env.JWT_SECRET as any);
    if (!decoded) throw Error("Invalid token");
    console.log(decoded);
    if (!decoded.admin) return next("Insufficient authorities");
    console.log(`decoded.user_id: ${decoded}`);
    console.log(`decoded.user_id: ${decoded.user_id}`);
    req.user = decoded.user_id;
    next();
  } catch (e: any) {
    return next(e.message);
  }
}
