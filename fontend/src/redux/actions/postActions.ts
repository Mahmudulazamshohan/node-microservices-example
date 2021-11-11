import { GET_POSTS, PostActionTypes, PostRemoveActionTypes, REMOVE_POST } from "../types/postTypes";

import { PostInterface } from "../interfaces/postInterface";

export const getPostsAction = (posts: PostInterface[]): PostActionTypes => {
  return {
    type: GET_POSTS,
    payload: posts,
  };
};
export const removePostAction = (postId: number): PostRemoveActionTypes => {
  return {
    type: REMOVE_POST,
    payload: postId,
  };
};
