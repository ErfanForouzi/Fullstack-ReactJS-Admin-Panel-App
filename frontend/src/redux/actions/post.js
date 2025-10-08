import { request } from "@/tools/request";

export function setPosts(payload) {
  return { type: "POSTS", payload };
}
export function setPostsLoading(payload) {
  return { type: "POSTS_LOADING", payload };
}
export function setPostLoading(payload) {
  return { type: "POST_LOADING", payload };
}
export function setPost(payload) {
  return { type: "POST", payload };
}
export function editPost(payload) {
  return { type: "EDIT_POST", payload };
}
export function editPostLoading(payload) {
  return { type: "EDIT_POST_LOADING", payload };
}
export function addPostLoading(payload) {
  return { type: "ADD_POST_LOADING", payload };
}

export function addPost(payload) {
  return { type: "ADD_POST", payload };
}
export function removePost(payload) {
  return { type: "REMOVE_PERSON", payload };
}
export function removePostLoading(payload) {
  return { type: "REMOVE_POST_LOADING", payload };
}

export function getPosts(page=1) {
  return async (dispatch, getState) => {
      dispatch(setPostsLoading(true));
      const response = await request({ url: "/api/article",params:{page} });
      console.log(response.data);
      if (response?.status === 200) {
        dispatch(setPostsLoading(false));
        return dispatch(setPosts(response?.data));
      } else {
        dispatch(setPostsLoading(false));
        return dispatch(setPosts([]));
      }
  };
}
export function getPost(id) {
  return async (dispatch) => {
    dispatch(setPostLoading(true));
    const response = await request({ url: `/api/article/${id}` });
    if (response?.status === 200) {
      dispatch(setPostLoading(false));
      return dispatch(setPost(response?.data?.article));
    } else {
      dispatch(setPostLoading(false));
      return dispatch(setPost({}));
    }
  };
}
export function createPost(data) {
  return async (dispatch) => {
    dispatch(addPostLoading(true));
    const response = await request({
      url: `/api/article`,
      method: "post",
      data,
    });
    if (response) {
      dispatch(addPost(data));
      dispatch(addPostLoading(false));
      return true;
    } else {
      dispatch(addPostLoading(false));
      return false;
    }
  };
}

export function updatePost({ id, data }) {
  return async (dispatch) => {
    dispatch(editPostLoading(true));
    const response = await request({
      url: `/api/article/${id}`,
      method: "put",
      data,
    });
    if (response) {
      dispatch(editPost({ id, data }));
      dispatch(editPostLoading(false));
      return true;
    } else {
      dispatch(editPostLoading(false));
      return false;
    }
  };
}

export function removePostAsyncAction(id) {
  return async (dispatch) => {
    dispatch(removePostLoading(true));
    const response = await request({
      url: `/api/article/${id}`,
      method: "delete",
    });
    if (response && response.status === 200) {
      dispatch(removePost(id));
      dispatch(removePostLoading(false));
      return true;
    } else {
      dispatch(removePostLoading(false));
      return false;
    }
  };
}
