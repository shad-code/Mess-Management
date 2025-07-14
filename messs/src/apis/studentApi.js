import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080', // ✅ Change if deployed elsewhere
    credentials: 'include',           // ⬅️ optional, depending on your auth method
  }),
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    // GET /students/me
    getMyProfile: builder.query({
      query: () => '/students/me',
      providesTags: ['Student'],
    }),

    // GET /students (Get all students)
    getAllStudents: builder.query({
      query: () => '/students/all', // Fetch all students
      providesTags: ['Student'],
    }),

    // GET by Id
    getProfileById: builder.query({
      query: (id) => `/students/${id}`,
      providesTags: ['Student'],
    }),

    // PUT /students/me
    updateMyProfile: builder.mutation({
      query: (updatedData) => ({
        url: '/students/me',
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['Student'],
    }),
  }),
});

export const { 
  useGetMyProfileQuery, 
  useUpdateMyProfileMutation, 
  useGetProfileByIdQuery, 
  useGetAllStudentsQuery // ✅ Export the new hook
} = studentApi;

