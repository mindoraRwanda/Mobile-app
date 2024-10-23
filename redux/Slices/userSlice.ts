import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserById = createAsyncThunk(
  'user/fetchById',
  async (userId: string) => {
    const response = await axios.get(`https://mindora-backend-beta-version-m0bk.onrender.com/api/therapists/${userId}`);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImage: string | null;
  }) => {
    const { userId, ...data } = userData;
    const response = await axios.put(`https://mindora-backend-beta-version-m0bk.onrender.com/api/therapists/${userId}`, data);
    return response.data;
  }
);

interface UserState {
  user: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update user';
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
