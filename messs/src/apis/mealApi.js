// src/apis/mealApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mealApi = createApi({
  reducerPath: 'mealApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/meals',
    credentials: 'include',
  }),
  tagTypes: ['Meal'],
  endpoints: (builder) => ({
    // 🔹 Create Meal (Admins only)
    createMeal: builder.mutation({
      query: (meal) => ({
        url: '',
        method: 'POST',
        body: meal,
      }),
      invalidatesTags: ['Meal'],
    }),

    cancelMeal: builder.mutation({
      query: (date) => ({
        url: '/cancel',
        method: 'GET',
        url: `/cancel?date=${date}`,
        // body: meal,
      }),
      invalidatesTags: ['Meal'],
    }),

    // 🔹 Get Meals by Day (Student/Admin)
    getMealsByDay: builder.query({
      query: (dayOfWeek) => ({
        url: `/student/filter?dayOfWeek=${dayOfWeek}`,
        method: 'GET',
      }),
      providesTags: ['Meal'],
    }),

    // 🔹 Update Meal (Admins only)
    updateMeal: builder.mutation({
      query: ({ id, ...meal }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: meal,
      }),
      invalidatesTags: ['Meal'],
    }),

    // 🔹 Delete Meal (Admins only)
    deleteMeal: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Meal'],
    }),
  }),
});

export const {
  useCreateMealMutation,
  useGetMealsByDayQuery,
  useUpdateMealMutation,
  useDeleteMealMutation,
  useCancelMealMutation,
} = mealApi;
