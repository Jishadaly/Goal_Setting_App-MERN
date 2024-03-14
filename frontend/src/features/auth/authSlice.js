import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//get user localStorage 
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}


//register user
export const register = createAsyncThunk('auth/register',async (user,thunkAPI)=>{
  try {
    return await authService.register(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
    return thunkAPI.rejectWithValue(message) 
  }
})

//login user
export const login = createAsyncThunk('auth/register',async (user,thunkAPI)=>{
  try {
    return await authService.login(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
    return thunkAPI.rejectWithValue(message) 
  }
})


export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
  })

  export const ProfileUpdate = createAsyncThunk('auth/upload',async (imgUrl , thunkAPI)=>{
    try {
      const token = thunkAPI.getState().auth.user.token;
       return await authService.profileUpload(token,imgUrl)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
      return thunkAPI.rejectWithValue(message) 
    }
  })



export const authSlice = createSlice({
  name: 'auth',
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
      .addCase(register.pending, login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, login.fulfilled, (state, action) => {
        state.user = action.payload;

        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(ProfileUpdate.pending, (state) => {
        state.isLoading = true
    })
    .addCase(ProfileUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;                
        state.user = {
            ...state.user,
            profileUrl: action.payload.profileUrl
        };
       
    })
    
    .addCase(ProfileUpdate.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});


export const { reset } = authSlice.actions
export default authSlice.reducer