import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData: { name: string; email: string; password: string }) => {
    const response = await axios.post(
      "/auth/register",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData: { email: string; password: string }) => {
    const response = await axios.post(
      "/auth/login",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
          sessionStorage.setItem('isAuthenticated', 'true');
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;