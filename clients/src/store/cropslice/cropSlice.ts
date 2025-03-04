import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Crop {
  _id: string;
  name: string;
  description: string;
  season: string;
}

interface PredictionResult {
  predictedYield: number;
  confidenceLevel: number;
  recommendations: string[];
}

interface CropState {
  crops: Crop[];
  loading: boolean;
  error: string | null;
  predictionResult: PredictionResult | null;
}

const initialState: CropState = {
  crops: [],
  loading: false,
  error: null,
  predictionResult: null,
};

export const fetchCropById = createAsyncThunk<Crop, string>(
  'crops/fetchCropById',
  async (id) => {
    const response = await axios.get(`/api/crops/${id}`);
    return response.data;
  }
);

export const fetchCropsByMonth = createAsyncThunk<Crop[], string>(
  'crops/fetchCropsByMonth',
  async (month) => {
    const response = await axios.get(`/api/crops/month/${month}`);
    return response.data;
  }
);

export const fetchAlternativeCrops = createAsyncThunk<Crop[], void>(
  'crops/fetchAlternativeCrops',
  async () => {
    const response = await axios.get('/api/crops/alternative');
    return response.data;
  }
);

export const fetchCustomerTrend = createAsyncThunk<Crop[], void>(
  'crops/fetchCustomerTrend',
  async () => {
    const response = await axios.get('/api/crops/customer-trend');
    return response.data;
  }
);

export const fetchCropPrediction = createAsyncThunk<
  PredictionResult,
  { cropType: string; temperature: number; rainfall: number; ph: number }
>(
  'crops/fetchCropPrediction',
  async (predictionData) => {
    const response = await axios.post('/api/prediction', predictionData);
    return response.data;
  }
);

const cropSlice = createSlice({
  name: 'crops',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCropById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCropById.fulfilled, (state, action) => {
        state.loading = false;
        state.crops = [action.payload];
      })
      .addCase(fetchCropById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch crop by ID';
      })
      .addCase(fetchCropsByMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCropsByMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.crops = action.payload;
      })
      .addCase(fetchCropsByMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch crops by month';
      })
      .addCase(fetchAlternativeCrops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlternativeCrops.fulfilled, (state, action) => {
        state.loading = false;
        state.crops = action.payload;
      })
      .addCase(fetchAlternativeCrops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch alternative crops';
      })
      .addCase(fetchCustomerTrend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerTrend.fulfilled, (state, action) => {
        state.loading = false;
        state.crops = action.payload;
      })
      .addCase(fetchCustomerTrend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch customer trend';
      })
      .addCase(fetchCropPrediction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCropPrediction.fulfilled, (state, action) => {
        state.loading = false;
        state.predictionResult = action.payload;
      })
      .addCase(fetchCropPrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch crop prediction';
      });
  },
});

export default cropSlice.reducer;
