import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { _id: 1, list: 1, name: "item-1-1", quantity: 5, resolved: false, created_at: "2024-04-04" },
    { _id: 2, list: 1, name: "item-1-2", quantity: 1, resolved: true, created_at: "2024-04-04" },
    { _id: 3, list: 1, name: "item-1-3", quantity: 1, resolved: true, created_at: "2024-04-04" },
    { _id: 4, list: 2, name: "item-2-1", quantity: 1, resolved: false, created_at: "2024-04-04" },
    { _id: 5, list: 2, name: "item-2-2", quantity: 3, resolved: true, created_at: "2024-04-04" },
    { _id: 6, list: 3, name: "item-3-1", quantity: 6, resolved: false, created_at: "2024-04-04" }
  ]
};

const itemSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setItems: ({ items }, { payload }) => {
      items = payload;
    },
    addItem: ({ items }, { payload }) => {
      payload._id = items[items.length - 1]._id + 1;
      if (!payload.quantity) payload.quantity = 0;
      payload.created_at = new Date().toISOString().slice(0, 10);
      items.push(payload);
    },
    updateItem: ({ items }, { payload }) => {
      const { id, data } = payload;
      const index = items.findIndex(item => item._id === id);
      if (index === -1) return;
      items[index].name = data.name || items[index].name;
      items[index].quantity = parseInt(data.quantity);
      items[index].resolved = data.resolved;
    },
    removeItem: ({ items }, { payload }) => {
      const removeIndex = items.findIndex(item => item._id === payload);
      if (removeIndex === -1) return;
      items.splice(removeIndex, 1);
    },
    removeItemByList: ({ items }, { payload }) => {
      const newItems = items.filter(item => item.list !== payload);
      setItems(newItems);
    }
  }
});

export const { setItems, addItem, removeItem, updateItem, removeItemByList } = itemSlice.actions;

export default itemSlice.reducer;
