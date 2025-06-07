import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";
// import apiSlice from "./api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth, 
  endpoints: (builder) => ({
    
    login: builder.mutation({
      query: (form) => ({
        url: "/auth/login",
        method: "POST",
        body: form,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/user/log-out",
        method: "POST",
      }),
    }),
    register:builder.mutation({
        query:(form)=>({
            url:'/auth/register',
            method:"POST",
            body:form
        })
    })
  }),
});

export const {
 
  useLoginMutation,
  useLogOutMutation,
  useRegisterMutation
  
} = userApi;