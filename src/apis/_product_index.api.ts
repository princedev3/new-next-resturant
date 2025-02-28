import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: "/get-products",
        method: "GET",
      }),
    }),
    getSingleProducts: builder.query<Product[], string>({
      query: (id) => ({
        url: `/get-products/${id}`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/create-product",
        method: "POST",
        body: productData,
      }),
    }),
    updateProduct: builder.mutation({
      query: (productData) => ({
        url: `/get-products`,
        method: "PUT",
        body: productData,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetSingleProductsQuery,
  useUpdateProductMutation,
} = productApi;
