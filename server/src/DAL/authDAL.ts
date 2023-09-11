import { IBAuthSignIp } from "../interfaces/authInterface";
import User from "../models/User";

const signUp = async (signUpItem: IBAuthSignIp) => {
  const { name, email, password } = signUpItem;

  const user = await User.create({
    name,
    email,
    password: password,
  });
  return user;
};

export { signUp };
