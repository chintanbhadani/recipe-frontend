import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: null };

const baseSlice = createSlice({
  name: "base",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = baseSlice.actions;
export default baseSlice.reducer;
