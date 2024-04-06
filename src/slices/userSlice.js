import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    { _id: 1, username: "member1", created_at: "2024-03-25" },
    { _id: 2, username: "member2", created_at: "2024-03-26" },
    { _id: 3, username: "member3", created_at: "2024-03-27" }
  ]
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsers: ({ users }, { payload }) => {
      users = payload;
    },
    getUserById: ({ users }, { payload }) => {
      // return users.find(item => item._id === payload);
    }
  }
});

export const { setUsers, getUser, getUserById } = userSlice.actions;

export default userSlice.reducer;
