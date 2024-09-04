import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface BookingState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BookingState = {
  status: 'idle',
  error: null,
};

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingDetails: any) => {
    const response = await axios.post(
      'https://mindora-backend-beta-version.onrender.com/api/appointments',
      bookingDetails
    );
    return response.data;
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create booking';
      });
  },
});

export default bookingSlice.reducer;
