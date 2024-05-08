import { configureStore } from '@reduxjs/toolkit'

import userReducer from "./slices/userSlice"
import orgReducer from "./slices/orgSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    org: orgReducer
  },
})

