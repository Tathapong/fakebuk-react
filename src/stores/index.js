import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadingSlice";
import userReducer from "./features/auth/usersSlice";
import postsReducer from "./features/posts/postSlice";

export default configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReducer,
    post: postsReducer
  }
});
