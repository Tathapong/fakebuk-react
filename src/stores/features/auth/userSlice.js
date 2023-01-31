import { createSlice } from "@reduxjs/toolkit";
import * as authService from "../../../api/authApi";
import * as userService from "../../../api/userApi";
import { actions as loadingActions } from "../../loadingSlice";

import { addAccesToken, removeAccesToken } from "../../../utilities/localstorage";

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    deleteUser: (state, action) => ""
  }
});

export const getMe = () => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());
    const res = await authService.getMe();
    const { user } = res.data;
    dispatch(actions.setUser(user));
  } catch (err) {
    throw new Error(err.message);
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const register = (input) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());
    const res = await authService.register(input);
    const { token } = res.data;
    addAccesToken(token);
    dispatch(getMe());
  } catch (err) {
    throw new Error(err.response.data.message);
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const login = (input) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());
    const res = await authService.login(input);
    addAccesToken(res.data.token);
    dispatch(getMe());
  } catch (err) {
    throw new Error(err.response.data.message);
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const logout = () => async (dispatch) => {
  dispatch(actions.deleteUser());
  removeAccesToken();
};

export const updateUser = (input) => async (dispatch) => {
  const res = await userService.updateUser(input);
  const { user } = res.data;
  dispatch(actions.setUser(user));
};

export const selectUser = (state) => state.user;

export default userSlice.reducer;
export const actions = userSlice.actions;
