import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  // reducers: {},
})

// export const { userLoggedIn, userLoggedOut } = userSlice.actions
export default languageSlice.reducer
