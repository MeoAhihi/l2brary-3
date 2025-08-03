import { AxiosRequestHeaders } from "axios";

import restConnector from "@/connectors/AxiosRestConnector";

interface RequestParams {
  url: string;
  headers?: AxiosRequestHeaders;
  data?: any;
}

interface RequestParams {
  url: string;
  headers?: AxiosRequestHeaders;
  data?: any;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  config?: any; // Optional: for extra axios config
}

const requestWithCustomAxios = async (requestParams: RequestParams) => {
  const rest = await restConnector();
  const {
    url,
    headers = {},
    data,
    method = "GET",
    config = {},
  } = requestParams;

  const response = await rest({
    url,
    method,
    headers,
    data,
    ...config,
  });

  return response.data;
};

const getWithCustomAxios = (params: Omit<RequestParams, "method">) =>
  requestWithCustomAxios({ ...params, method: "GET" });
const postWithCustomAxios = (params: Omit<RequestParams, "method">) =>
  requestWithCustomAxios({ ...params, method: "POST" });
const putWithCustomAxios = (params: Omit<RequestParams, "method">) =>
  requestWithCustomAxios({ ...params, method: "PUT" });
const deleteWithCustomAxios = (params: Omit<RequestParams, "method">) =>
  requestWithCustomAxios({ ...params, method: "DELETE" });

export {
  requestWithCustomAxios,
  getWithCustomAxios,
  postWithCustomAxios,
  putWithCustomAxios,
  deleteWithCustomAxios,
};
