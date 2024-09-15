import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  comments: [],
  status: 'idle',
  error: null,
};

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (commentData: { content: string; createdBy: string; postId: string }) => {
    const response = await axios.post('https://mindora-backend-beta-version.onrender.com/api/comments', commentData);
    return response.data;
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;
