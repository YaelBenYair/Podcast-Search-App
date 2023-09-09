import axios, { AxiosResponse } from "axios";

const sendRequest = async (
  method: "post" | "get" | "patch" | "put" | "delete",
  url: string,
  accessToken: string,
  data: { [key: string]: string | number }
): Promise<AxiosResponse> => {
  const header = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  const response = await axios[method](url, data, { headers: header });
  return response;
};

export default sendRequest;
