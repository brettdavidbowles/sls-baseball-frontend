import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './store'
import { HYDRATE } from 'next-redux-wrapper'

export interface WindowState {
  isMobile: boolean
}

const initialState: WindowState = {
  isMobile: true
}

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action
      }
    })
  }
})

export const { setIsMobile } = windowSlice.actions

export const selectIsMobile = (state: AppState) => state.window.isMobile

export default windowSlice.reducer