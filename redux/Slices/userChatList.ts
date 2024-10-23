import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  profileImage: string | null;
}

interface ChatListState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ChatListState = {
  users: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('chatList/fetchUsers', async () => {
  const response = await axios.get('https://mindora-backend-beta-version-m0bk.onrender.com/api/users');
  return response.data.map((user: any) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    profileImage: user.profileImage,
  }));
});

const chatListSlice = createSlice({
  name: 'chatList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default chatListSlice.reducer;