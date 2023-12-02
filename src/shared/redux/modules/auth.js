import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authEdit, authInfo, authLogin, authSignUp } from '../../../axios/authAPI'

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  error: null,
  avatar: '',
  info: null,
}

// ASYNC ACTION CREATOR -----------> EXTRA REDUCER

// SignUp
export const __doSignUp = createAsyncThunk(
  "SIGN_UP",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const res = await authSignUp.post('', payload);
      return thunkAPI.fulfillWithValue(res.data);
    }
    catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)

// LOGIN
export const __doLogin = createAsyncThunk(
  "LOGIN",
  async (payload, thunkAPI) => {
    try {
      const res = await authLogin.post('', payload);
      return thunkAPI.fulfillWithValue(res.data);
    }
    catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)

// FETCH_USER_INFO
export const __fetchUserInfo = createAsyncThunk(
  "FETCH_USER_INFO",
  async (payload, thunkAPI) => {
    try {
      const res = await authInfo.get()
      return thunkAPI.fulfillWithValue(res.data)
    }

    catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

// EDIT_USER_DATA
export const __editUserData = createAsyncThunk(
  "EDIT_USER_DATA",
  async (payload, thunkAPI) => {
    try {
      const res = await authEdit.patch('', payload);

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
    removeUser: (state, action) => {
      return { ...state, user: null }
    }
  },
  extraReducers: (builder) => {
    builder
      // SIGN UP
      .addCase(__doSignUp.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(__doSignUp.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isError = false;
      })

      .addCase(__doSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(__doLogin.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(__doLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isError = false;
        localStorage.setItem('user', JSON.stringify(action.payload))
      })

      .addCase(__doLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      })

      // user INFO
      .addCase(__fetchUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isError = false;
        localStorage.setItem('info', JSON.stringify(action.payload))
      })
      .addCase(__fetchUserInfo.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.payload;
      })

      // EDIT
      .addCase(__editUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__editUserData.fulfilled, (state, action) => {
        console.log(action.payload);
        state.info = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(__editUserData.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.payload;
      })
  }
})


export default authSlice.reducer
export const { removeUser } = authSlice.actions