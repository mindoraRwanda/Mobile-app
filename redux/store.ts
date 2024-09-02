import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import therapistReducer from './therapistSlice';
import feedsReducer from './feedsSlice';
import exerciseReducer from './exerciseSlice';  // Import the exerciseReducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    therapists: therapistReducer,
    exercises: exerciseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
