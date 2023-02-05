import { configureStore } from "@reduxjs/toolkit";

import loadingReducer from "./loadingSlice";
import myUserReducer from "./features/auth/myUserSlice";
import postsReducer from "./features/posts/postSlice";
import userReducer from "./features/users/userSlice";

export default configureStore({
  reducer: {
    loading: loadingReducer,
    myUser: myUserReducer,
    post: postsReducer,
    user: userReducer
  }
});
