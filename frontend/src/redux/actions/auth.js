import { request } from "@/tools/request";
import { requestWithoutAuth } from "@/tools/request2";
import { removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken } from "@/tools/utils";

export function setUser(payload) {
  return { type: "USER", payload };
}
export function setUserLoading(payload) {
  return { type: "USER_LOADING", payload };
}
export function setUserIsLoggedIn(payload) {
  return { type: "USER_ISLOGGING", payload };
}
export function setUserRegister(payload) {
  return { type: "USER_REGISTERING", payload };
}

export function login(values) {
  return async (dispatch) => {
    const response = await requestWithoutAuth({
      url: "/api/login",
      data: values,
      method: "POST",
    });
    console.log(response);
    if (response?.status === 200) {    
      setAccessToken(response?.data?.accessToken);
      setRefreshToken(response?.data?.refreshToken);
      dispatch(getUser());
      return true
    } else {
      return false
    }
  };
}

export function getUser() {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    const response = await request({ url: "/api/user" });
    if (response?.status === 200) {
      dispatch(setUser(response?.data?.user));
      dispatch(setUserLoading(false));
      dispatch(setUserIsLoggedIn(true));
    } else {
      dispatch(setUserLoading(false));
      dispatch(setUser({}));
    }
  };
}


export function logout() {
  return async (dispatch) => {
    dispatch(setUserIsLoggedIn(false));
    removeAccessToken();
    removeRefreshToken();
  };
}

export function register(values) {
  return async (dispatch) => {
    dispatch(setUserRegister(true));
    const response = await requestWithoutAuth({
      url: "/api/register",
      data: values,
      method: "POST",
    });
    return response;
  };
}