export function posts(state = [], action) {
  switch (action.type) {
    case "POSTS":
      return action.payload;
    case "REMOVE_POST":
      return  state?.articles.filter((p) => p.id !== action.payload);
    case "EDIT_POST": {
      const post = state?.articles.find((p) => p.id === Number(action.payload.id));
      post.title = action.payload?.data?.title;
      post.text = action.payload?.data?.text;
      return state;
    }
    case "ADD_POST": {
      console.log(state,action);
      return [...state.articles, action.payload];
    }
    default:
      return state;
  }
}
export function post(state = {}, action) {
  switch (action.type) {
    case "POST":
      return action.payload;
    default:
      return state;
  }
}
export function postsLoading(state = false, action) {
  switch (action.type) {
    case "POSTS_LOADING":
      return action.payload;
    default:
      return state;
  }
}
export function postLoading(state = false, action) {
  switch (action.type) {
    case "POST_LOADING":
      return action.payload;
    default:
      return state;
  }
}

export function editPostLoading(state = false, action) {
  switch (action.type) {
    case "EDIT_POST_LOADING":
      return action.payload;
    default:
      return state;
  }
}
export function addPostLoading(state = false, action) {
  switch (action.type) {
    case "ADD_POST_LOADING":
      return action.payload;
    default:
      return state;
  }
}
