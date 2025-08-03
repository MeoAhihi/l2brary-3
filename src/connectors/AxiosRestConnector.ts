import axios from "axios";
import { cookies } from "next/headers";

import { ACCESS_TOKEN } from "@/constants/authentication";
import { IS_PRODUCTION, STATIC_API_URL } from "@/constants/common";

const restConnector = async (cookie?: string) => {
  const cookieStore = await cookies();

  const CreateRestConnector = axios.create({
    baseURL: STATIC_API_URL,
    timeout: 30000,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie ? cookie : cookieStore.get(ACCESS_TOKEN)}`,
    },
  });

  CreateRestConnector.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 401) {
        cookieStore.delete(ACCESS_TOKEN);
        window.location.reload();
      }
      if (!IS_PRODUCTION) console.log(error);

      return Promise.resolve({
        data: {
          success: false,
          error: { status, message },
        },
      });
    },
  );

  return CreateRestConnector;
};

export default restConnector;
