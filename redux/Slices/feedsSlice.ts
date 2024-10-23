import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


 interface Section {
  body: string;
  header: string;
}

interface Reference {
  url: string;
  title: string;
}

interface Content {
  sections: Section[];
  references: Reference[];
}

interface Article {
  id: string;
  courseId: string;
  title: string;
  content: Content;
  author: string;
  category: string;
  publishedDate: string;
  picture: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Video {
  id: string;
  courseId: string;
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  category: string;
  duration: number;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string;
}

interface FeedsState {
  articles: Article[];
  videos: Video[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedsState = {
  articles: [],
  videos: [],
  loading: false,
  error: null,
};

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', async () => {
  const response = await axios.get('https://mindora-backend-beta-version-m0bk.onrender.com/api/resources');
  return response.data;
});

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.videos = action.payload.videos;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch feeds';
      });
  },
});

export default feedsSlice.reducer;