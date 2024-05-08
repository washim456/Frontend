import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  org: null,
}

export const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {
    setOrg: (state, { payload} ) => {
        state.org = payload
    },
    clearOrg: (state) => {
        state.org = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setOrg, clearOrg } = orgSlice.actions

export default orgSlice.reducer