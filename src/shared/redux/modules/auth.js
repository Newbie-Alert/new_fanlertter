import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authInstance from '../../../axios/authAPI'

const initialState = {
  user: [],
  isLoading: false,
  isError: false,
  error: null
}

export const __fetchData = createAsyncThunk(
  "FETCH_DATA",
  async (payload, thunkAPI) => {
    try {
      const userData = await authInstance.get('/user', {
        "headers": {
          'Authorization': `Bearer ${payload}`
        }
      })
      return thunkAPI.fulfillWithValue(userData.data)
    } catch (err) {
      console.log(err);
    }
  }
)

export const __setUserData = createAsyncThunk(
  "SET_USER_DATA",
  async (payload, thunkAPI) => {
    try {
      const res = await authInstance.post('/login?expiresIn=1m', payload);
      return thunkAPI.fulfillWithValue(res.data);
    }
    catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)


const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(__setUserData.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(__setUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isError = false;
        localStorage.setItem('user', JSON.stringify(action.payload))
      })

      .addCase(__setUserData.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(__fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__fetchData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(__fetchData.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error;
      })
  }
})


export default authSlice.reducer