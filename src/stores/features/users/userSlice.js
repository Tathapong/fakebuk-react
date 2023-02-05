import { createSlice } from "@reduxjs/toolkit";
import * as userService from "../../../api/userApi";
import * as friendService from "../../../api/friendApi";
import * as friendStatus from "../../../config/constants";
import { actions as loadingActions } from "../../loadingSlice";

const initialState = { user: {}, friends: [], statusWithMe: "" };
const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.friends = action.payload.friends;
      state.statusWithMe = action.payload.statusWithMe;
    },
    deleteFriend: (state, action) => {
      const userId = action.payload;
      const idx = state.friends.findIndex((item) => item.id === userId);
      if (idx !== -1) state.friends.splice(idx, 1);
      state.statusWithMe = friendStatus.FRIEND_STATUS_ANNONYMOUS;
    },
    addFriend: (state, action) => {
      state.statusWithMe = friendStatus.FRIEND_STATUS_REQUESTER;
    },
    acceptFriend: (state, action) => {
      const myUser = action.payload;
      state.friends.push(myUser);
      state.statusWithMe = friendStatus.FRIEND_STATUS_FRIEND;
    }
  }
});

export const thunk_getUserById = (userId) => async (dispatch, getState) => {
  try {
    if (!getState().loading) await dispatch(loadingActions.startLoading());
    const res = await userService.getUserFriends(userId);
    dispatch(actions.setUser(res.data));
  } catch (err) {
    throw err.response.data;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const thunk_deleteFriend = (friendId) => async (dispatch, getState) => {
  try {
    await friendService.deleteFriend(friendId);
    const userId = getState().myUser.id;
    dispatch(actions.deleteFriend(userId));
  } catch (err) {
    throw err.response.data;
  }
};

export const thunk_addFriend = (friendId) => async (dispatch) => {
  try {
    await friendService.addFriend(friendId);
    dispatch(actions.addFriend());
  } catch (err) {
    throw err.response.data;
  }
};
export const thunk_acceptFriend = (friendId) => async (dispatch, getState) => {
  try {
    await friendService.acceptFriend(friendId);
    const myUser = getState().myUser;
    dispatch(actions.acceptFriend(myUser));
  } catch (err) {
    throw err.response.data;
  }
};

export default usersSlice.reducer;
export const actions = usersSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectStatusWithMe = (state) => state.user.statusWithMe;
export const selectFriends = (state) => state.user.friends;
