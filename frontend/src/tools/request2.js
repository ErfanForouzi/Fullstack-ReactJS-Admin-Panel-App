import axios from "axios";
import { BASE_URL2 } from "./constants";
import {CustomNotification} from "@/ui";

axios.defaults.baseURL = BASE_URL2;

function getError(e) {
  if (e?.response?.data) {
    return e.response.data;
  }
  return { message: "connection error", status: 500 };
}

export async function requestWithoutAuth(config) {
  try {
    const response = await axios.request(config);
    return response;
  } catch (e) {
    return getError(e);
  }
}
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error?.response?.data) {
    //   CustomNotification({
    //     type: "error",
    //     style: {
    //       fontFamily: "vazirmatn",
    //       message: error?.response?.data?.message,
    //     },
    //   });
    // }else {
    //     CustomNotification({
    //         type: "error",
    //         style: {
    //           fontFamily: "vazirmatn",
    //         },
    //       });
    // }
  }
);
