import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  unfoldable: false,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    changeSidebarShow: (state, action) => {
      state.sidebarShow = action.payload.sidebarShow
    },
    changeSidebarUnfoldable: (state, action) => {
      state.unfoldable = action.payload.unfoldable
    },
  },
})

export const { changeSidebarShow, changeSidebarUnfoldable } = sidebarSlice.actions
export default sidebarSlice.reducer
