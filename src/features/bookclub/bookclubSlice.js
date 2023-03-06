import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const bookclubSlice = createSlice({
    name: 'bookclub',
    initialState,
    // reducers: {},
})

// export const { userLoggedIn, userLoggedOut } = userSlice.actions
export default bookclubSlice.reducer
