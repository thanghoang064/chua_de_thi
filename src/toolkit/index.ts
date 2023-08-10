import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './product/product.service'
import productSlice from './product/productSlice'


export const store = configureStore({
  reducer: {
     [productApi.reducerPath]: productApi.reducer,
     products: productSlice
  },
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(productApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch