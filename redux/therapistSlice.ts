import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the type for TherapistState
interface TherapistState {
  therapists: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define initial state for therapists
const initialTherapistState: TherapistState = {
  therapists: [],
  status: 'idle',
  error: null,
};

// Define async thunk for fetching therapists
export const fetchTherapists = createAsyncThunk(
  'therapists/fetchTherapists',
  async () => {
    const response = await axios.get('https://mindora-backend-beta-version.onrender.com/api/therapists');
    return response.data;
  }
);

const therapistSlice = createSlice({
  name: 'therapists',
  initialState: initialTherapistState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTherapists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTherapists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.therapists = action.payload;
      })
      .addCase(fetchTherapists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch therapists';
      });
  },
});

export default therapistSlice.reducer;
