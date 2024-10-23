import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Question {
  id: string;
  exerciseId: string;
  question: string;
  correctAnswer: string;
  points: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficultyLevel: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[]; 
}

interface ExerciseState {
  exercises: Exercise[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ExerciseState = {
  exercises: [],
  status: 'idle',
  error: null,
};


export const fetchExercises = createAsyncThunk('exercises/fetchExercises', async () => {
  const response = await axios.get('https://mindora-backend-beta-version-m0bk.onrender.com/api/exercises');
  return response.data;
});

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exercises = action.payload; 
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch exercises';
      });
  },
});

export default exerciseSlice.reducer;
