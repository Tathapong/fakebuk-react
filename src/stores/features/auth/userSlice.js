import { createSlice } from "@reduxjs/toolkit";
import * as authService from "../../../api/authApi";
import * as userService from "../../../api/userApi";
import { addAccesToken, removeAccesToken } from "../../../utilities/localstorage";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    selectUser: (state) => state
  }
});

export const selectUser = (state) => state.user;

export const thunk_getMe = () => async (dispatch) => {
  const res = await authService.getMe();
  dispatch(actions.setUser(res.data.user));
};

export const thunk_register = (input) => async (dispatch) => {
  const res = await authService.register(input);
  addAccesToken(res.data.token);
  dispatch(thunk_getMe());
};

export const thunk_login = (input) => async (dispatch) => {
  const res = await authService.login(input);
  addAccesToken(res.data.token);
  await dispatch(thunk_getMe());
};

export const thunk_logout = () => (dispatch) => {
  dispatch(actions.setUser(null));
  removeAccesToken();
};

export const thunk_updateUser = (input) => async (dispatch) => {
  const res = await userService.updateUser(input);
  dispatch(actions.setUser(res.data.user));
};

export default userSlice.reducer;
export const actions = userSlice.actions;
