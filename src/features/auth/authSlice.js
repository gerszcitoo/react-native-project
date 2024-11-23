import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "shop",
  initialState: {
    value: {
      email: null,
      token: null,
      profilePicture: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      (state.value.email = action.payload.email),
        (state.value.token = action.payload.idToken);
    },
    clearUser: (state, action) => {
      (state.value.email = null), (state.value.token = null);
    },
    setProfilePicture: (state, action) => {
      state.value.profilePicture = action.payload;
    },
  },
});

export const { setUser, clearUser, setProfilePicture } = authSlice.actions;

export default authSlice.reducer;
