import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


interface MedicalProfile {
  condition: string;
  prison: string;
  currentMedications: string;
  mentalHealthTreatmentHistory: string;
  allergies: string;
  previousHospitalizations: string;
  substanceUse: string;
  sleepPatterns: string;
  dietaryHabits: string;
  physicalActivity: string;
}

interface PersonalInformation {
  fullName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  maritalStatus: string;
  occupation: string;
  educationLevel: string;
  lifestyleFactors: string;
  livingSituation: string;
  stressFactors: string;
  hobbiesAndInterests: string;
  pastTrauma: string;
}

interface EmergencyContact {
  name: string;
  relationship: string;
  contact: string;
  alternateContact: string;
  consentToContact: boolean;
}

interface ProfileData {
  userId: string;
  medicalProfile: MedicalProfile;
  personalInformation: PersonalInformation;
  emergencyContact: EmergencyContact;
}

interface ProfileState {
  profile: ProfileData | null;
  patientId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  patientId: null,
  loading: false,
  error: null,
};


export const submitProfile = createAsyncThunk<
  { patientId: string },
  ProfileData,
  { rejectValue: string }
>(
  'profile/submitProfile',
  async (profileData, thunkAPI) => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        profileData.userId = user.id || ''; 
        if (!profileData.userId) {
          return thunkAPI.rejectWithValue('User ID not found in user data.');
        }
      } else {
        return thunkAPI.rejectWithValue('User not found. Please sign up first.');
      }


      console.log('Submitting Profile Data:', profileData);

      const response = await axios.post(
        'https://mindora-backend-beta-version-m0bk.onrender.com/api/patients', 
        profileData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { id: patientId } = response.data;
      await AsyncStorage.setItem('patientId', patientId);

      return { patientId };
    } catch (error: any) {
      let errorMessage = 'Something went wrong!';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileData>) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.patientId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.patientId = action.payload.patientId;
        // state.profile = action.meta.arg;
      })
      .addCase(submitProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to submit profile';
      });
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;