import axios from "axios";

export const createComment = (postId, input) => axios.post(`/posts/${postId}/comments`, input);
export const updateComment = (postId, commentId, input) => axios.patch(`/posts/${postId}/comments/${commentId}`, input);
export const deleteComment = (postId, commentId) => axios.delete(`/posts/${postId}/comments/${commentId}`);
