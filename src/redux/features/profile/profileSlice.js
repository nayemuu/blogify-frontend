import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  picture: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    initiateProfileInfo: (state, action) => {
      state.name = action.payload.name;
      state.picture = action.payload.picture;
    },

    clearProfileInfo: (state) => {
      state.name = "";
      state.picture = "";
    },
    clearProfileInfo: () => initialState, // Return initial state directly
  },
});

export const { initiateProfileInfo, clearProfileInfo } = profileSlice.actions;
export default profileSlice.reducer;
