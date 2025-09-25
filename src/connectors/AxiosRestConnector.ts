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
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401) {
      deleteCookie(ACCESS_TOKEN);

      window.location.reload();
    }
    if (!IS_PRODUCTION) console.log(error);

    const apiError: ApiError = { message, status };

    return Promise.reject(apiError);
  },
);

export default axiosClient;
