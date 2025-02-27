import { Coupon } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  tagTypes: ["Coupons"],
  endpoints: (builder) => ({
    createCoupons: builder.mutation({
      query: (couponData) => ({
        url: "/create-coupon",
        method: "POST",
        body: couponData,
      }),
      invalidatesTags: ["Coupons"],
    }),
    getCoupon: builder.query<Coupon[], void>({
      query: () => ({
        url: "/create-coupon",
        method: "GET",
      }),
      providesTags: ["Coupons"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/create-coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons"],
    }),
  }),
});

export const {
  useCreateCouponsMutation,
  useGetCouponQuery,
  useDeleteCouponMutation,
} = couponApi;
