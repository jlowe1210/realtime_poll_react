import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";

const initialState = {
  userInfo: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.logout.matchFulfilled,
      (state, action) => {
        state.userInfo = null;
        localStorage.removeItem("user");
      }
    );
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
