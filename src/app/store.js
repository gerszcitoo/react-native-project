import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/cart/cartSlice";
import { shopApi } from "../services/shopService";
import { receiptApi } from "../services/receiptService";

export const store = configureStore({
  reducer: {
    shopReducer,
    cartReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [receiptApi.reducerPath]: receiptApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(receiptApi.middleware),
});
