import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cropReducer from "./cropslice/cropSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crop: cropReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;