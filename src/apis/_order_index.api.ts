import { Order } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type chartProp = {
  last7Days: {
    date: string;
    totalSales: number;
  }[];
  status: number;
};

type orderType = {
  orders: Order[];
  count: number;
  status: number;
};
export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["orders"],
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
    getSingleOrder: builder.query({
      query: (paymentIntent) => ({
        url: `/create-intent/${paymentIntent}`,
        method: "GET",
      }),
    }),
    getAllOrder: builder.query<chartProp, void>({
      query: () => ({
        url: `/order`,
        method: "GET",
      }),
    }),
    getActiveOrders: builder.query<orderType, string>({
      query: (pageNumber) => ({
        url: `/all-order?page=${pageNumber}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    archiveOrders: builder.mutation({
      query: (id) => ({
        url: `/all-order/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreateIntentMutation,
  useConfirmPaymentMutation,
  useGetSingleOrderQuery,
  useGetAllOrderQuery,
  useGetActiveOrdersQuery,
  useArchiveOrdersMutation,
} = orderApi;
