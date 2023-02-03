import { createSlice } from "@reduxjs/toolkit";
import * as authService from "../../../api/authApi";
import * as userService from "../../../api/userApi";
import { addAccesToken, removeAccesToken } from "../../../utilities/localstorage";
import { actions as loadingActions } from "../../loadingSlice";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    deleteUser: (state, action) => initialState
  }
});

//Thunk creator fucntion

export const thunk_getMe =
  (isGetMe = true) =>
  async (dispatch) => {
    try {
      isGetMe && dispatch(loadingActions.startLoading());
      const res = await authService.getMe();
      const { user } = res.data;
      if (isGetMe) dispatch(actions.setUser(user));
      else setTimeout(() => dispatch(actions.setUser(user)), 1);
    } catch (err) {
      if (isGetMe) throw err.response.data;
      else throw err;
    } finally {
      isGetMe && dispatch(loadingActions.stopLoading());
    }
  };

export const thunk_register = (input) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());
    const res = await authService.register(input);
    const { token } = res.data;
    addAccesToken(token);
    await dispatch(thunk_getMe(false));
  } catch (err) {
    throw err.response.data;
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const thunk_login = (input) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());
    const res = await authService.login(input);
    addAccesToken(res.data.token);
    await dispatch(thunk_getMe(false));
  } catch (err) {
    throw err.response.data;
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const thunk_logout = () => (dispatch) => {
  dispatch(actions.deleteUser());
  removeAccesToken();
};

export const thunk_updateUser = (input) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());
    const res = await userService.updateUser(input);
    const { user } = res.data;
    dispatch(actions.setUser(user));
  } catch (err) {
    throw err.response.datat;
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

// selector function
export const selectMe = (state) => state.user;

export default userSlice.reducer;
export const actions = userSlice.actions;
