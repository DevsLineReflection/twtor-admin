import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  // reducers: {},
});

// export const { userLoggedIn, userLoggedOut } = userSlice.actions
export default testimonialSlice.reducer;
