import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";

import { ACCESS_TOKEN } from "@/constants/authentication";
import { IS_PRODUCTION, STATIC_API_URL } from "@/constants/common";
import { ApiError } from "@/types/api";

const axiosClient = axios.create({
  baseURL: STATIC_API_URL,
  timeout: 30000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async function (config) {
    const token = getCookie(ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status || error?.status;
    const responseData = error?.response?.data;

    // Get message from response data if available, fallback to error message
    const message = responseData?.message || error?.message;
    const code = error?.code;

    if (status === 401) {
      deleteCookie(ACCESS_TOKEN);
      window.location.reload();
    }

    // Only log errors in development, except 403
    if (!IS_PRODUCTION && status !== 403) {
      console.log({ message, status, code, responseData });
    }

    const apiError: ApiError = {
      message,
      status,
      code,
      responseData,
    };

    return Promise.reject(apiError);
  },
);

export default axiosClient;
