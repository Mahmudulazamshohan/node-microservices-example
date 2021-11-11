import { PostInterface } from "../interfaces/postInterface";

export const GET_POSTS = "GET_POSTS";
export const REMOVE_POST = "REMOVE_POST";

export interface GetPostsStateType {
  posts: PostInterface[];
}
interface GetPostsActionType {
  type: typeof GET_POSTS;
  payload: PostInterface[];
}
export type PostActionTypes = {
  type: string;
  payload: PostInterface[];
};
export type PostRemoveActionTypes = {
  type: string;
  payload: number;
};

