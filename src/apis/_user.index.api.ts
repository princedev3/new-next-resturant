import { User } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type userProp = {
  users: User[];
  status: number;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    // credentials: "include",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (userData) => ({
        url: "/verify-email",
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: (userData) => ({
        url: "/forgot-password",
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    enterNewPassword: builder.mutation({
      query: (userData) => ({
        url: "/enter-new-password",
        body: userData,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getAllusers: builder.query<userProp, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    archiveAUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useEnterNewPasswordMutation,
  useGetAllusersQuery,
  useArchiveAUserMutation,
  useLogoutMutation,
} = userApi;
