import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  // reducers: {},
})

// export const { userLoggedIn, userLoggedOut } = userSlice.actions
export default paymentSlice.reducer
