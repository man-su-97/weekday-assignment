// jobListingsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IJobDescription } from '../../types/proptypes';
import { RootState } from '../store/store';

interface ApiResponse {
  jdList: IJobDescription[];
  totalCount: number;
}

interface JobListingsState {
  data: ApiResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: JobListingsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchJobListings = createAsyncThunk(
  'jobListings/fetchJobListings',
  async (_, { rejectWithValue }) => {
    try {
      const myHeaders = {
        'Content-Type': 'application/json',
      };

      const body = {
        limit: 10,
        offset: 0,
      };

      const response = await axios.post<ApiResponse>(
        'https://api.weekday.technology/adhoc/getSampleJdJSON',
        body,
        { headers: myHeaders }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const jobListingsSlice = createSlice({
  name: 'jobListings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobListings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchJobListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectJobListings = (state: RootState) => state.jobListings;

export default jobListingsSlice.reducer;
