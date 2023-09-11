import axios, { AxiosResponse } from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
const sendRequest = async (
  method: "post" | "get" | "patch" | "put" | "delete",
  url: string,
  data?: { [key: string]: any }
): Promise<AxiosResponse> => {
  console.log(data);
  const response = await axios[method](url, data);
  return response;
};

const sendQueryRequest = async (
  method: "post" | "get" | "patch" | "put" | "delete",
  url: string,
  queries?: URLSearchParams
): Promise<AxiosResponse> => {
  const requestUrl = queries ? `${url}?${queries.toString()}` : url;
  console.log(requestUrl);
  const response = await axios[method](requestUrl);
  return response;
};

export { sendRequest, sendQueryRequest };
