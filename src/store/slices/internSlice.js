import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    interns : []
}

export const internSlice = createSlice({
  name: 'interns',
  initialState,
  reducers: {
    setAllInterns: (state, { payload} ) => {
        state.interns = [...payload]
    },
    updateOne: (state, {payload}) => {
        state.interns = state.interns.map(intern => {
            if(intern._id === payload._id){
                return {
                    ...intern,
                    ...payload
                }
            }else return intern
        })
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAllInterns, updateOne } = internSlice.actions

export default internSlice.reducer