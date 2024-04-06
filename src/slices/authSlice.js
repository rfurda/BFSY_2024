import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userinfo: localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")) : null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.userinfo = payload;
      localStorage.setItem("userinfo", JSON.stringify(payload));
    },
    logout: (state, { payload }) => {
      state.userinfo = null;
      localStorage.removeItem("userinfo");
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
