import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const countrySlice = createSlice({
  name: "country",
  initialState,
  // reducers: {},
});

// export const { userLoggedIn, userLoggedOut } = userSlice.actions
export default countrySlice.reducer;
