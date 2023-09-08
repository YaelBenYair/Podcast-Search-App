import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/authInterface";

export const generateToken = (user: IUser) => {
  const payload = {
    user_id: user._id,
    email: user.email,
    admin: user.isAdmin,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};
