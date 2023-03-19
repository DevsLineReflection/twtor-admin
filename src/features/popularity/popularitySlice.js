import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const popularitySlice = createSlice({
    name: 'popularity',
    initialState,
    // reducers: {},
})

// export const { userLoggedIn, userLoggedOut } = userSlice.actions
export default popularitySlice.reducer
