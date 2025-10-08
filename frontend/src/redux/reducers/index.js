import { combineReducers } from "redux";
import {
  addPersonLoading,
  editPersonLoading,
  people,
  peopleLoading,
  person,
  personLoading,
  removePersonLoading,
} from "./person";
import { addPostLoading, editPostLoading, post, postLoading, posts, postsLoading } from "./post";
import { theme } from "./theme";
import { user, userLoading, userIsLogging } from "./auth";

export default combineReducers({
  people,
  posts,
  peopleLoading,
  person,
  post,
  personLoading,
  removePersonLoading,
  theme,
  user,
  userIsLogging,
  userLoading,
  editPersonLoading,
  addPersonLoading,
  postsLoading,
  postLoading,
  addPostLoading,
  editPostLoading,
});
