import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const zoomSlice = createSlice({
  name: "zoom",
  initialState,
  // reducers: {},
});

// export const { userLoggedIn, userLoggedOut } = userSlice.actions
export default zoomSlice.reducer;
