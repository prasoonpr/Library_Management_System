import { configureStore } from "@reduxjs/toolkit";
import userReduer from '../redux/userSlice'
import { userApi } from "../services/userApi.js";
import { adminApi } from "../services/adminApi.js";

export const store = configureStore({
    reducer: {
      user:userReduer,
      [userApi.reducerPath]: userApi.reducer, 
      [adminApi.reducerPath]: adminApi.reducer, 
    },
   
    middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(userApi.middleware)
      getDefaultMiddleware().concat(userApi.middleware).concat(adminApi.middleware),
  });









   // Adding the api middleware enables caching, invalidation, and refetching