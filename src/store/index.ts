import { configureStore } from "@reduxjs/toolkit";
import auth from "../pages/Auth/slice";

export const store = configureStore({
  reducer: {
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
