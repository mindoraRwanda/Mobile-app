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
import supportCommunityReducer from './Slices/supportCommunitySlice';
import profileReducer from './Slices/profileSlice';
import Community from '@/app/Community';


const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    therapists: therapistReducer,
    exercises: exerciseReducer,
    bookings: bookingReducer,
    user: userReducer,
    comments: commentReducer,
    chat: chatReducer,
    chatList: chatListReducer,
    feeds: feedsReducer,
    supportCommunity: supportCommunityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
