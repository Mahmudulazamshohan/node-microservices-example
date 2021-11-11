import { PostInterface } from "../interfaces/postInterface";
import {
  GET_POSTS,
  GetPostsStateType,
  PostActionTypes,
  REMOVE_POST,
} from "../types/postTypes";

const initialStateGetPosts: GetPostsStateType = {
  posts: [],
};

type ActionTypes = {
  type: string;
  payload: any;
};
export const getPostsReducer = (
  state = initialStateGetPosts,
  action: ActionTypes
): GetPostsStateType => {
  
  
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => {
          return p.id !== action.payload;
        }),
      };

    default:
      return state;
  }
};
