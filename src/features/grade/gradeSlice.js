import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const gradeSlice = createSlice({
  name: 'grade',
  initialState,
  // reducers: {},
})

// export const { userLoggedIn, userLoggedOut } = userSlice.actions
export default gradeSlice.reducer
