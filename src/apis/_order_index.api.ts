import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        body: orderData,
      }),
    }),
    createIntent: builder.mutation({
      query: (intentData) => ({
        url: `/create-intent/${intentData}`,
        method: "POST",
      }),
    }),
    confirmPayment: builder.mutation({
      query: (paymentIntent) => ({
        url: `/create-intent/${paymentIntent}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreateIntentMutation,
  useConfirmPaymentMutation,
} = orderApi;
