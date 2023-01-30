import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    startLoading: (state) => true,
    stopLoading: (state) => false
  }
});

export default loadingSlice.reducer;
export const actions = loadingSlice.actions;
