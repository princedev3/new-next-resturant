import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    createEventOrder: builder.mutation({
      query: (eventData) => ({
        url: "/event",
        method: "POST",
        body: eventData,
      }),
    }),
    createEventIntent: builder.mutation({
      query: (id) => ({
        url: `/event-intent/${id}`,
        method: "POST",
      }),
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/event-intent/${id}`,
        method: "GET",
      }),
    }),
    confirmPayment: builder.mutation({
      query: (id) => ({
        url: `/event-intent/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateEventOrderMutation,
  useCreateEventIntentMutation,
  useGetSingleOrderQuery,
  useConfirmPaymentMutation,
} = eventApi;
