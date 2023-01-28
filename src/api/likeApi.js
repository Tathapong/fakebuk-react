import axios from "axios";
export const toggleLike = (postId) => axios.post(`/posts/${postId}/likes`);
