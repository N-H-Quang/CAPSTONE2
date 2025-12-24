import { createSlice } from "@reduxjs/toolkit";
import { UserProfile } from "@/@type/model.type";

const initialState: {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
} = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.isLoading = false;
    },
    clearCredentials: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    },
    setAuthLoaded: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setCredentials, clearCredentials, setAuthLoaded } = authSlice.actions;

export default authSlice.reducer;
