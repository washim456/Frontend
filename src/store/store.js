import { configureStore } from '@reduxjs/toolkit'

import userReducer from "./slices/userSlice"
import orgReducer from "./slices/orgSlice"
import pendingReqSlice from './slices/pendingReqSlice'
import internSlice from './slices/internSlice'
import searchSlice from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    org: orgReducer,
    pending: pendingReqSlice,
    interns: internSlice,
    search: searchSlice
  },
})

