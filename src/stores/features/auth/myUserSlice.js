import { createSlice } from "@reduxjs/toolkit";
import * as authService from "../../../api/authApi";
import * as userService from "../../../api/userApi";
import { addAccesToken, removeAccesToken } from "../../../utilities/localstorage";
import { actions as loadingActions } from "../../loadingSlice";
import { thunk_getUserById } from "../users/userSlice";

const initialState = null;

const userSlice = createSlice({
  name: "myUser",
  initialState,
  reducers: {
    setMyUser: (state, action) => action.payload,
    deleteMyUser: (state, action) => initialState
  }
});

export const thunk_getMe =
  (isGetMe = true) =>
  async (dispatch) => {
    try {
      isGetMe && dispatch(loadingActions.startLoading());
      const res = await authService.getMe();
      const { user } = res.data;
      if (isGetMe) dispatch(actions.setMyUser(user));
      else setTimeout(() => dispatch(actions.setMyUser(user)), 1);
    } catch (err) {
      if (isGetMe) throw err.response.data;
      else throw err;
    } finally {
      isGetMe && dispatch(loadingActions.stopLoading());
    }
  };

export const thunk_register = (input) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await authService.register(input);
    const { token } = res.data;
    addAccesToken(token);
    await dispatch(thunk_getMe(false));
  } catch (err) {
    throw err.response.data;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const thunk_login = (input) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await authService.login(input);
    addAccesToken(res.data.token);
    await dispatch(thunk_getMe(false));
  } catch (err) {
    throw err.response.data;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const thunk_logout = () => (dispatch) => {
  dispatch(actions.deleteMyUser());
  removeAccesToken();
};

export const thunk_updateUser = (input) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await userService.updateUser(input);
    const { user } = res.data;
    dispatch(actions.setMyUser(user));
    const myUserId = +getState().myUser.id;
    await dispatch(thunk_getUserById(myUserId));
  } catch (err) {
    throw err.response.data;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const selectMe = (state) => state.myUser;

export default userSlice.reducer;
export const actions = userSlice.actions;
