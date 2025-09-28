import {combineReducers} from "redux"
import { people, peopleLoading, person, personLoading, removePersonLoading } from "./person"
import { post, posts } from "./post"
import { theme } from "./theme"


export default combineReducers({
  people,
  posts,
  peopleLoading,
  person,
  post,
  personLoading,
  removePersonLoading,
  theme
})

