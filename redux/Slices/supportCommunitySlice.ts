import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


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
  loading: boolean;
  error: string | null;
}

const initialState: CommunityState = {
  communities: [],
  loading: false,
  error: null,
};

export const fetchCommunities = createAsyncThunk(
  'communities/fetchCommunities',
  async () => {
    const response = await axios.get('https://mindora-backend-beta-version.onrender.com/api/support-communities');
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
    },
    });

export default supportCommunitySlice.reducer;