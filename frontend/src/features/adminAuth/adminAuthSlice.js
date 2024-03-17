import { createSlice, createAsyncThunk, isRejected } from '@reduxjs/toolkit'
import adminAuthService from './adminAuthService'


const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
  admin: admin ? admin : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}


export const adminLogin = createAsyncThunk(
  'adminAuth/login', async (admin, thunkAPI) => {
    try {
      return await adminAuthService.adminLogin(admin)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

export const adminLogout = createAsyncThunk('adminAuth/logout', async () => {
  await adminAuthService.adminLogout()
})


export const getAllusers = createAsyncThunk('auth/getAllUsers', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().adminAuth.admin.token;
    console.log("admin.token : ", token);
    const response = await adminAuthService.getAlluser(token)



    return response;

  } catch (error) {
    const message = (error.response && error.response.data.message) || error.message
      || error.toString();

    return thunkAPI.rejectWithValue(message)
  }
})


export const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.admin = null
      })
      .addCase(getAllusers.pending , (state)=>{
        state.isLoading = true
      })
      .addCase(getAllusers.fulfilled , (state,action)=>{
        state.isLoading = false
        state.isError = false
        state.users = action.payload
        
      })
  }
})


export const { reset } = adminAuthSlice.actions
export default adminAuthSlice.reducer