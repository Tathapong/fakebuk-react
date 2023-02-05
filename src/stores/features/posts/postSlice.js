import { createSelector, createSlice } from "@reduxjs/toolkit";
import { actions as loadingActions } from "../../loadingSlice";
import * as postService from "../../../api/postApi";
import * as likeService from "../../../api/likeApi";
import * as commentService from "../../../api/commentApi";

export const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    setPosts: (state, action) => action.payload,
    addPost: (state, action) => {
      state.unshift(action.payload);
    },
    updatePost: (state, action) => {
      const idx = state.find((item) => item.id === action.payload.id);
      if (idx !== -1) state.splice(idx, 1, action.payload);
    },
    deletePost: (state, action) => {
      const idx = state.find((item) => item.id === action.payload);
      if (idx !== -1) state.splice(idx, 1);
    },
    addLike: (state, action) => {
      const { idx, like } = action.payload;
      state[idx].Likes?.push(like);
    },
    deleteLike: (state, action) => {
      const { idx, myUserId } = action.payload;
      state[idx].Likes = state[idx].Likes.filter((item) => item.userId !== myUserId);
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const idx = state.findIndex((item) => item.id === postId);

      if (idx !== -1) state[idx].Comments?.push(comment);
    },
    updateComment: (state, action) => {
      const { postId, commentId, commentInput } = action.payload;
      const idx = state.findIndex((item) => item.id === postId);

      if (idx !== -1) {
        state[idx].Comments?.map((item) => {
          if (item.id === commentId) item.title = commentInput;
          return item;
        });
      }
    },
    deleteComment: (state, action) => {
      const { postId, commentId } = action.payload;
      const idx = state.findIndex((item) => item.id === postId);
      if (idx !== -1) {
        const commentIdx = state[idx].Comments.findIndex((item) => item.id === commentId);
        if (commentIdx) state[idx].Comments?.splice(commentIdx, 1);
      }
    }
  }
});

export const thunk_getUserPost = (userId, friend) => async (dispatch, getState) => {
  try {
    if (!getState().loading) await dispatch(loadingActions.startLoading());
    const res = await postService.getUserPost(friend, userId);
    const { posts } = res.data;
    dispatch(actions.setPosts(posts));
  } catch (err) {
    throw err.response.data;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const thunk_createPost = (input) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());
    const res = await postService.createPost(input);
    const { post } = res.data;
    dispatch(actions.addPost(post));
  } catch (err) {
    throw err.response.data;
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const thunk_updatePost = (postId, input) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());
    const res = await postService.updatePost(postId, input);
    const { post } = res.data;
    dispatch(actions.updatePost(post));
  } catch (err) {
    throw err.response.data;
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const thunk_deletePost = (postId) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());
    await postService.deletePost(postId);
    setTimeout(() => dispatch(actions.deletePost(postId)), 1);
  } catch (err) {
    throw err.response.data;
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const thunk_toggleLike = (postId) => async (dispatch, getState) => {
  try {
    const res = await likeService.toggleLike(postId);
    const { like } = res.data;

    const idx = getState().post.findIndex((item) => item.id === postId);
    const myUserId = getState().myUser.id;

    if (like) dispatch(actions.addLike({ idx, like }));
    else dispatch(actions.deleteLike({ idx, myUserId }));
  } catch (err) {
    throw err.response.data;
  }
};

export const thunk_createComment = (postId, input) => async (dispatch) => {
  try {
    const res = await commentService.createComment(postId, input);
    const { comment } = res.data;
    dispatch(actions.addComment({ postId, comment }));
  } catch (err) {
    throw err.response.data;
  }
};
export const thunk_updateComment = (postId, commentId, commentInput) => async (dispatch) => {
  try {
    await commentService.updateComment(postId, commentId, { title: commentInput });
    dispatch(actions.updateComment({ postId, commentId, commentInput }));
  } catch (err) {
    throw err.response.data;
  }
};
export const thunk_deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await commentService.deleteComment(postId, commentId);
    dispatch(actions.deleteComment({ postId, commentId }));
  } catch (err) {
    throw err.response.data;
  }
};

export const selectUserPost = (state) => state.post;
export const selectIsUserLike = createSelector(
  [selectUserPost, (state, postId) => postId, (state) => state.myUser.id],
  (posts, postId, userId) => {
    const post = posts.find((item) => item.id === postId);
    if (post) return post.Likes?.find((item) => item.userId === userId);
  }
);

export default postsSlice.reducer;
export const actions = postsSlice.actions;
