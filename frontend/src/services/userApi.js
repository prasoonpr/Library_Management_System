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
    }),
    getBooks:builder.query({
        query:()=>'/user/books',
        providesTags:['getbooks']
    }),
    borrowBook:builder.mutation({
        query:(id)=>({
            url:`/user/books/borrow/${id}`,
            method:'POST',

        }),
        invalidatesTags:['getbooks']
    }),
    borrowedHistory:builder.query({
        query:()=>'/user/books/borrow',
        providesTags:['getBorrowedHistory']
    }),
    returnBook:builder.mutation({
        query:(id)=>({
            url:`/user/books/return/${id}`,
            method:'POST',
            
        }),
        invalidatesTags:['getBorrowedHistory']
    })
  }),
});

export const {
 
  useLoginMutation,
  useLogOutMutation,
  useRegisterMutation,
  useGetBooksQuery,
  useBorrowBookMutation,
  useBorrowedHistoryQuery,
  useReturnBookMutation
  
} = userApi;