const HOST_NAME = "http://127.0.0.1:8000/api";

export enum ENDPOINT {
  PODCAST = `${HOST_NAME}/podcast/`,
  USER = `${HOST_NAME}/user/me`,
  SIGNUP = `${HOST_NAME}/user/signup`,
  LOGIN = `${HOST_NAME}/user/login`,
}
