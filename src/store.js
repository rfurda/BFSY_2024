import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import listReducer from "./slices/listSlice";
import itemReducer from "./slices/itemSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    lists: listReducer,
    items: itemReducer
  },
  devTools: true
});

export default store;
