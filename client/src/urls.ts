const HOST_NAME = "http://127.0.0.1:8000/api";

export enum ENDPOINT {
  PODCAST = `${HOST_NAME}/podcast/`,
  USER = `${HOST_NAME}/auth/me`,
  USER_UPDATE = `${HOST_NAME}/auth/`,
  SIGNUP = `${HOST_NAME}/auth/signup`,
  LOGIN = `${HOST_NAME}/auth/login`,
}
