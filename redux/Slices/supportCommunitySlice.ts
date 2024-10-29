import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Moderator {
  id: string;
  firstName: string;
  lastName: string;
  username: string | null;
  email: string;
  phoneNumber: string | null;
  profileImage: string | null;
  password: string;
  role: string;
  resetPasswordToken: string | null;
  resetPasswordExpiry: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Community {
  id: string;
  moderatorId: string;
  name: string;
  description: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  moderator: Moderator;
}

interface CommunityState {
  communities: Community[];
  userCommunities: Community[];
  loading: boolean;
  error: string | null;
}

const initialState: CommunityState = {
  communities: [],
  userCommunities: [],
  loading: false,
  error: null,
};

export const fetchCommunities = createAsyncThunk(
  'communities/fetchCommunities',
  async () => {
    const response = await axios.get('https://mindora-backend-beta-version-m0bk.onrender.com/api/support-communities');
    return response.data;
  },
);

export const fetchCommunitiesByUserId = createAsyncThunk(
  'communities/fetchCommunitiesByUserId',
  async () => {
    const user = await AsyncStorage.getItem('user');
    if (!user) {
      throw new Error('User not found in local storage');
    }
    const userId = JSON.parse(user).id;
    const response = await axios.get(`https://mindora-backend-beta-version-m0bk.onrender.com/api/user-communities/${userId}`);
    return response.data;
  },
);

const supportCommunitySlice = createSlice({
  name: 'supportCommunity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommunities.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCommunities.fulfilled, (state, action) => {
      state.loading = false;
      state.communities = action.payload;
    });
    builder.addCase(fetchCommunities.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'An error occurred.';
    });
    builder.addCase(fetchCommunitiesByUserId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCommunitiesByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.userCommunities = action.payload;
    });
    builder.addCase(fetchCommunitiesByUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'An error occurred.';
    });
  },
});

export default supportCommunitySlice.reducer;