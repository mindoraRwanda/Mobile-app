// supportCommunitySlice.ts

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
  // Include any other fields returned by your API
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
    const response = await axios.get(
      'https://mindora-backend-beta-version-m0bk.onrender.com/api/support-communities'
    );
    return response.data;
  }
);

export const fetchCommunitiesByUserId = createAsyncThunk(
  'communities/fetchCommunitiesByUserId',
  async () => {
    const user = await AsyncStorage.getItem('user');
    if (!user) {
      throw new Error('User not found in local storage');
    }
    const userId = JSON.parse(user).id;
    const response = await axios.get(
      `https://mindora-backend-beta-version-m0bk.onrender.com/api/support-communities/user/${userId}`
    );
    return response.data;
  }
);

export const joinCommunity = createAsyncThunk(
  'communities/joinCommunity',
  async (
    data: { communityId: string; userId: string; role: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        'https://mindora-backend-beta-version-m0bk.onrender.com/api/user-communities',
        data
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'An unknown error occurred.');
      }
    }
  }
);

const supportCommunitySlice = createSlice({
  name: 'supportCommunity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Communities
      .addCase(fetchCommunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.communities = action.payload;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred while fetching communities.';
      })
      // Fetch User Communities
      .addCase(fetchCommunitiesByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunitiesByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userCommunities = action.payload;
      })
      .addCase(fetchCommunitiesByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'An error occurred while fetching user communities.';
      })
      // Join Community
      .addCase(joinCommunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinCommunity.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, you can update userCommunities state here if needed
      })
      .addCase(joinCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'An error occurred while joining the community.';
      });
  },
});

export default supportCommunitySlice.reducer;