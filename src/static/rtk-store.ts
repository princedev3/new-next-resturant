import { couponApi } from "@/apis/_coupon_index.api";
import { eventApi } from "@/apis/_event_index.api";
import { galleryApi } from "@/apis/_gallery_index.api";
import { orderApi } from "@/apis/_order_index.api";
import { productApi } from "@/apis/_product_index.api";
import { userApi } from "@/apis/_user.index.api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(productApi.middleware)
      .concat(couponApi.middleware)
      .concat(orderApi.middleware)
      .concat(galleryApi.middleware)
      .concat(eventApi.middleware),
});
