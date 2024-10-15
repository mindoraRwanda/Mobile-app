import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    const response = await axios.post('https://mindora-backend-beta-version-m0bk.onrender.com/api/auth/login', {
      email,
      password,
    });
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
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
    const response = await axios.post('https://mindora-backend-beta-version-m0bk.onrender.com/api/auth/register', {
      firstName,
      lastName,
      email,
      username,
      phoneNumber,
      profileImage,
      password,
    });
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  }
);

export const loadToken = createAsyncThunk(
  'auth/loadToken',
  async()=>{
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    return token;
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
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
