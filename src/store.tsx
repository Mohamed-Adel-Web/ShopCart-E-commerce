/** @format */

import { configureStore } from "@reduxjs/toolkit";
import productsDataReducer from "./Slices/ProductsSplice";
export const store = configureStore({
  reducer: {
    productsData: productsDataReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
