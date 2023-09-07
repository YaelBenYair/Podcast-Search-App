import { IAuth } from "../interfaces/auth";

const auth1: IAuth = {
  name: "admin",
  password: "1234",
  email: "admin@gmail.com",
  admin: false,
  user_id: "1",
};

const auth2: IAuth = {
  name: "yael",
  password: "12345",
  email: "yael@gmail.com",
  admin: false,
  user_id: "2",
};

const users: IAuth[] = [auth1, auth2];

const getUser = (user_id: string) => {
  //   const use: IAuth = users.filter((user) => user.user_id === user_id);
};
