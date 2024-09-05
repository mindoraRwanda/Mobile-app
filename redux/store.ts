import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import therapistReducer from './therapistSlice';
import exerciseReducer from './exerciseSlice';  
import bookingReducer from './bookingSlice';  
import userReducer from './userSlice';
import commentReducer from './commentSlice';  

const store = configureStore({
  reducer: {
    auth: authReducer,
    therapists: therapistReducer,
    exercises: exerciseReducer,
    bookings: bookingReducer,
    user: userReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
