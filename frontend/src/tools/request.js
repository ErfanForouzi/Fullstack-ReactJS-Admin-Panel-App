import axios from "axios";
import { BASE_URL } from "./constants";
import { CustomNotification } from "@/ui";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from "./utils";

axios.defaults.baseURL = BASE_URL;

function getError(e) {
  if (e?.response?.data) {
    return e.response.data;
  }
  return { message: "connection error", status: 500 };
}

export async function request(config) {
  try {
    const response = await axios.request(config);
    return response;
  } catch (e) {
    return getError(e);
  }
}
axios.interceptors.request.use(
  function (config) {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const { data } = await requestWithoutAuth.post(
          "/api/get-access-token",
          {
            refreshToken: getRefreshToken(),
          }
        );

        setAccessToken(data.accessToken);

        return request(originalRequest);
      } catch (error) {
        removeAccessToken();
        removeRefreshToken();
        location.reload();
        return Promise.reject(error);
      }
    }
  }
);
