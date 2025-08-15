import { configureStore } from '@reduxjs/toolkit'
import { chatApi } from '../Slices/ApiSlice'

export const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(chatApi.middleware),
})
