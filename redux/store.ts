import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import therapistReducer from './Slices/therapistSlice';
import exerciseReducer from './Slices/exerciseSlice';  
import bookingReducer from './Slices/bookingSlice';
import userReducer from './Slices/userSlice';
import commentReducer from './Slices/commentSlice';  
import chatReducer from './Slices/chatSlice';
import chatListReducer from './Slices/userChatList';
import feedsReducer from './Slices/feedsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    therapists: therapistReducer,
    exercises: exerciseReducer,
    bookings: bookingReducer,
    user: userReducer,
    comments: commentReducer,
    chat: chatReducer,
    chatList: chatListReducer,
    feeds: feedsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
