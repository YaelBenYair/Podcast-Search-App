import { Request, Response } from "express";
import crypto from "crypto";
import User from "../models/User";
import { generateToken } from "../handlers/authHandlers";
import { IUser } from "../interfaces/authInterface";
import { AuthorizedRequest } from "../interfaces/authInterface";

const postSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Please provide all fields",
      });
    }

    let user: IUser | null = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        body: undefined,
        status: 400,
      });
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "User Created successfully",
      body: token,
      status: 201,
    });
  } catch (e: any) {
    res.status(400).json({
      message: e.message,
      body: e,
      status: 400,
    });
  }
};

const postGetToken = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "Please provide all fields",
      });
    }

    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      throw new Error("Incorrect credentials");
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    if (user.password !== hashedPassword) {
      return new Error("Incorrect credentials");
    }

    const token = generateToken(user);
    return res.status(200).json({
      message: "Logged in successfully",
      body: token,
      status: 200,
    });
  } catch (e: any) {
    return res.status(400).json({
      message: e.message,
      body: undefined,
      status: 400,
    });
  }
};

/*const postRefresh = async (req: Request, res: Response) => {
  try {
  } catch (e: any) {}
};*/

const getMe = async (req: AuthorizedRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.user_id).select("-password");
    return res.status(200).json({
      message: "",
      body: user,
      status: 200,
    });
  } catch (e: any) {
    res.status(500).json({
      message: e.message,
      body: e,
      status: 500,
    });
  }
};

export { postSignup, postGetToken, getMe };
