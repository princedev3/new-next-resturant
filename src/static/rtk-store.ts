import { couponApi } from "@/apis/_coupon_index.api";
import { galleryApi } from "@/apis/_gallery_index.api";
import { productApi } from "@/apis/_product_index.api";
import { userApi } from "@/apis/_user.index.api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(productApi.middleware)
      .concat(couponApi.middleware)
      .concat(galleryApi.middleware),
});
