import { configureStore } from '@reduxjs/toolkit'
import { bookApi } from './api/bookApi'
import { userApi } from './api/userApi'

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware, userApi.middleware),
})