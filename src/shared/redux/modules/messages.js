import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  messages: [],
  isLoading: false,
  isError: false,
  error: null,
};

// createAsyncThunk 2 개의 인자 [비동기]
// 1. 이름
// 2. 함수(payload, thunk 내장 기능 객체 API)
// 3. dispatch로 extraReducer를 연결해주자 비동기!
//    (thunkAPI.fulfill / thunkAPI.rejectWith)

export const __getMessages = createAsyncThunk(
  "GET_MESSAGES",
  // 서버의 상태에 따라 작동
  async (payload, thunkAPI) => {
    try {
      const res = await axios.get('http://localhost:4000/messages');
      // 네트워크 요청이 성공 시
      return thunkAPI.fulfillWithValue(res.data);
    }
    catch (err) {
      // 네트워크 요청이 실패 시
      return thunkAPI.rejectWithValue(err)
    }
  }
)

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getMessages.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.messages = action.payload
      })
      .addCase(__getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload
      },)
  }
})


export default messageSlice.reducer
export const { addMsg, removeMsg, editMsg } = messageSlice.actions;