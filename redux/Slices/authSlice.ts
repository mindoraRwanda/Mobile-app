import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


interface AuthState {
  token: string | null;
  user: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


const initialAuthState: AuthState = {
  token: null,
  user: null,
  status: 'idle',
  error: null,
};


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post('https://mindora-backend-beta-version.onrender.com/api/auth/login', {
      email,
      password,
    });
    return response.data;
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({
     firstName,
     lastName,
     email,
     username,
     phoneNumber,
     profileImage,
     password }: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phoneNumber: string;
    profileImage: string;
    password: string;
  }) => {
    const response = await axios.post('https://mindora-backend-beta-version.onrender.com/api/auth/register', {
      firstName,
      lastName,
      email,
      username,
      phoneNumber,
      profileImage,
      password,
    });
    return response.data;
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to sign up';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
