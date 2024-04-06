import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: [
    {
      _id: 1,
      owner: 1,
      name: "list-1",
      items: [1, 2, 3],
      members: [2, 3],
      archived: true,
      created_at: "2024-03-29"
    },
    {
      _id: 2,
      owner: 2,
      name: "list-2",
      items: [4, 5],
      members: [4, 5, 7, 10],
      archived: false,
      created_at: "2024-03-29"
    },
    {
      _id: 3,
      owner: 3,
      name: "test",
      items: [6],
      members: [1, 4, 8],
      archived: false,
      created_at: "2024-03-30"
    }
  ]
};

const listSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setList: ({ lists }, { payload }) => {
      lists = payload;
    },
    addList: ({ lists }, { payload }) => {
      payload._id = lists[lists.length - 1]._id + 1;
      payload.created_at = new Date().toISOString().slice(0, 10);
      payload.members = [];
      lists.push(payload);
    },
    updateList: ({ lists }, { payload }) => {
      const { id, data } = payload;
      const index = lists.findIndex(list => list._id === id);
      if (index < 0) return;
      lists[index].name = data.name ? data.name : lists[index].name;
      lists[index].archived = data.archived;
    },
    removeList: ({ lists }, { payload }) => {
      const removeIndex = lists.findIndex(item => item._id === payload);
      if (removeIndex < 0) return;
      lists.splice(removeIndex, 1);
    },
    addMemberList: ({ lists }, { payload }) => {
      const { listId, memberId } = payload;
      const index = lists.findIndex(list => list._id === listId);
      if (index < 0) return;
      lists[index].members.push(memberId);
      let members = new Set(lists[index].members);
      lists[index].members = Array.from(members);
    },
    removeMemberList: ({ lists }, { payload }) => {
      const { listId, memberId } = payload;
      const index = lists.findIndex(list => list._id === listId);
      if (index < 0) return;
      let { members } = lists[index];
      members = members.filter(item => item !== memberId);
      lists[index].members = members;
    },
    addItemList: ({ lists }, { payload }) => {
      const { listId, itemId } = payload;
      const index = lists.findIndex(list => list._id === listId);
      if (index < 0) return;
      lists[index].items.push(itemId);
    },
    removeItemList: ({ lists }, { payload }) => {
      const { listId, itemId } = payload;
      const index = lists.findIndex(list => list._id === listId);
      if (index < 0) return;
      let { items } = lists[index];
      items = items.filter(item => item !== itemId);
      lists[index].items = items;
    }
  }
});

export const {
  setList,
  addList,
  updateList,
  removeList,
  addItemList,
  removeItemList,
  addMemberList,
  removeMemberList
} = listSlice.actions;

export default listSlice.reducer;
