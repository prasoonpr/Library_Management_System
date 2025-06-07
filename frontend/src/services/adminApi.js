import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";
// import apiSlice from "./api";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth, 
  endpoints: (builder) => ({
    addBook:builder.mutation({
        query:(form)=>({
            url:'/admin/books/create',
            method:"POST",
            body:form
        }),
        invalidatesTags:['getBooks']
    }),
    getBooks:builder.query({
        query:()=>"/admin/books",
        providesTags:['getBooks']
    }),
    editBook:builder.mutation({
        query:({id,formData})=>({
             url: `/admin/books/edit/${id}`,
            method: "PUT",
            body: formData,
        }),
        invalidatesTags: ['getBooks'],
    }),
    archiveBook: builder.mutation({
      query: (id) => ({
        url: `/admin/books/archive/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ['getBooks'],
    }),

       unArchiveBook: builder.mutation({
      query: (id) => ({
        url: `/admin/books/unarchive/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ['getBooks'],
    }),

    getUsers:builder.query({
        query:()=>'/admin/users',
        providesTags:['getUsers']
    }),
    blockUser: builder.mutation({
  query: (id) => ({
    url: `/admin/users/block/${id}`,
    method: "PUT",
  }),
  invalidatesTags: ['getUsers'],
}),
unblockUser: builder.mutation({
  query: (id) => ({
    url: `/admin/users/unblock/${id}`,
    method: "PUT",
  }),
  invalidatesTags: ['getUsers'],
}),

  }),
});

export const {
 
    useAddBookMutation,
    useGetBooksQuery,
    useEditBookMutation,
    useArchiveBookMutation,
    useUnArchiveBookMutation,
    useGetUsersQuery,
    useBlockUserMutation,
    useUnblockUserMutation
  
} = adminApi;