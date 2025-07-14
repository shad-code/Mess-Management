// src/api/duesApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const duesApi = createApi({
  reducerPath: 'duesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080', // ✅ Update if hosted elsewhere
    credentials: 'include',           // ⬅️ Needed if using cookies/session-based auth
  }),
  tagTypes: ['Dues'],
  endpoints: (builder) => ({
    // ✅ GET /attendance-dues/my-dues (for the logged-in student)
    getMyAttendanceDues: builder.query({
      query: () => '/attendance-dues/my-dues',
      providesTags: ['Dues'],
    }),

    // ✅ GET /attendance-dues/all (admin)
    getAllAttendanceDues: builder.query({
      query: () => '/attendance-dues/all',
      providesTags: ['Dues'],
    }),

    // ✅ Recalculate dues for a student
    recalculateDuesForStudent: builder.mutation({
      query: (email) => ({
        url: `/attendance-dues/recalculate?email=${encodeURIComponent(email)}`,
        method: 'POST',
      }),
      invalidatesTags: ['Dues'],
    }),
  }),
});

export const {
  useGetMyAttendanceDuesQuery,
  useGetAllAttendanceDuesQuery,
  useRecalculateDuesForStudentMutation,
} = duesApi;
