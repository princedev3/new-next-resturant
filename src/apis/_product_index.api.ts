import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type productType = {
  allProducts: Product[];
  count: number;
  status: number;
};
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query<productType, string>({
      query: (page) => ({
        url: `/get-products?page=${page}`,
        method: "GET",
      }),
      providesTags: ["products"],
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
      invalidatesTags: ["products"],
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
