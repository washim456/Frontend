import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   searchText : ""
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    search: (state, { payload} ) => {
        state.searchText = payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { search } = searchSlice.actions

export default searchSlice.reducer