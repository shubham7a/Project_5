import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./Slices/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
  },
});
