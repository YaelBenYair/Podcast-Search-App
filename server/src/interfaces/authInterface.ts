import { Jwt } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export interface IBAuth {
  password: string;
  email: string;
}

export interface IAuth {
  name: string;
  admin: boolean;
  user_id: string;
}

export interface IUser extends IBAuth {
  isAdmin?: boolean;
  name: string;
  _id: any;
}

export type AuthorizedRequest = Request & { user: IAuth };
