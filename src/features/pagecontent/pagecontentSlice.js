import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const pagecontentSlice = createSlice({
  name: "pagecontent",
  initialState,
  // reducers: {},
});

// export const { userLoggedIn, userLoggedOut } = userSlice.actions
export default pagecontentSlice.reducer;
