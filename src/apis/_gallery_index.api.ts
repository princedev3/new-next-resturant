import { Gallery } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const galleryApi = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["Gallery"],
  endpoints: (builder) => ({
    createGallery: builder.mutation({
      query: (galleryData) => ({
        url: "/gallery",
        method: "POST",
        body: galleryData,
      }),
      invalidatesTags: ["Gallery"],
    }),
    getGallery: builder.query<Gallery[], void>({
      query: () => ({
        url: "/gallery",
        method: "GET",
      }),
      providesTags: ["Gallery"],
    }),
    deleteGallery: builder.mutation({
      query: (id) => ({
        url: "/gallery/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Gallery"],
    }),
  }),
});

export const {
  useCreateGalleryMutation,
  useGetGalleryQuery,
  useDeleteGalleryMutation,
} = galleryApi;
