import { request } from "@/tools/request";

export function setPosts(payload) {
  return { type: "POSTS", payload };
}
export function setPost(payload) {
  return { type: "POST", payload };
}

export function getPosts() {
  return async (dispatch, getState) => {
    if (getState().posts.length === 0) {
      const response = await request({ url: "/posts" });
      if (response?.status === 200) {
        return dispatch(setPosts(response?.data));
      } else {
        return dispatch(setPosts([]));
      }
    }
  };
}
export function getPost(id) {
  return async (dispatch) => {
    const response = await request({ url: `/posts/${id}` });
    if (response?.status === 200) {
      return dispatch(setPost(response?.data));
    } else {
      return dispatch(setPost({}));
    }
  };
}
