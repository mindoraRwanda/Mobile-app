interface ChatListState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChatList = createAsyncThunk(
  'chatList/fetchChatList',
  async () => {
    const response = await axios.get('https://mindora-backend-beta-version.onrender.com/api/users');
    return response.data.map((user: any) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      profileImage: user.profileImage,
    }));
  }
);

interface User {
  id: string;
  firstName: string;
  lastName: string;
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

const chatListSlice = createSlice({
  name: 'chatList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChatList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchChatList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch chat list';
      });
  },
});

export default chatListSlice.reducer;