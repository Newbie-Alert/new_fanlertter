import { createSlice } from "@reduxjs/toolkit";

const initialState = [];


const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMsg: (state, action) => {
      return [action.payload, ...state];
    },
    removeMsg: (state, action) => {
      return state.filter(msg => msg.id !== action.payload)
    },
    editMsg: (state, action) => {
      return state.map(msg => {
        if (msg.id === action.payload.id) {
          console.log(action);
          return { ...msg, message: action.payload.newMsg };
        } else {
          return msg
        }
      })
    }
  }
})

export default messageSlice.reducer
export const { addMsg, removeMsg, editMsg } = messageSlice.actions;