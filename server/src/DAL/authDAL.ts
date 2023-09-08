import User from "../models/User";

const signUp = async () => {
  const user = await User.create();
};
