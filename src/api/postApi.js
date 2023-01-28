import axios from "axios";

export const createPost = (input) => axios.post("/posts", input);
export const updatePost = (postId, input) => axios.patch(`/posts/${postId}`, input);
export const deletePost = (postId) => axios.delete(`/posts/${postId}`);
export const getUserPost = (include, userId) =>
  axios.get(`/users/${userId}/posts/${include ? "?include=" + include : ""}`);
