import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pending : []
}

export const pendingSlice = createSlice({
  name: 'pending',
  initialState,
  reducers: {
    setPendingRequests: (state, { payload }) => {
        state.org = payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPendingRequests } = pendingSlice.actions

export default pendingSlice.reducer