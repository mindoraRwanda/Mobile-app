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

interface BookingDetails {
  patientId: string;
  therapistId: string;
  startTime: string;
  endTime: string;
  location: string;
  appointmentType: string;
  status: string;
  notes: string;
}

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingDetails: BookingDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://mindora-backend-beta-version.onrender.com/api/appointments',
        bookingDetails
      );
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      return rejectWithValue((error as any).response?.data?.message || 'Failed to create booking');
    }
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
        state.error = (action.payload as string) || 'Failed to create booking';
      });
  },
});

export default bookingSlice.reducer;