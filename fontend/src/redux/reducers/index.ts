import { combineReducers } from "redux";
import { getPostsReducer } from "./postReducers";

const rootReducer = combineReducers({
  posts: getPostsReducer,
  
});

export default rootReducer;
