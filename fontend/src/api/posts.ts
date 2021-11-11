import { Dispatch } from "redux";
import axios from "axios";

import { getPostsAction } from "../redux/actions/postActions";
import { PostActionTypes } from "../redux/types/postTypes";

export const getPosts = async () => {
  return async function (dispatch: Dispatch<PostActionTypes>) {
    return await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(({ data }) => {
        dispatch(getPostsAction(data));
      })
      .catch(console.error);
  };
};

export const removePost = (id: number) => {};
