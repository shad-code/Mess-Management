import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/feedback', // Adjust if needed
    credentials: 'include', // Ensures cookies are sent with requests
  }),
  endpoints: (builder) => ({
    // 📝 Submit Feedback (Student)
    submitFeedback: builder.mutation({
      query: (feedbackData) => ({
        url: '/student',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Ensure the request is sent as JSON
          },
        body: JSON.stringify(feedbackData),
        credentials: 'include', // Ensure credentials are included in mutation requests
      }),
    }),

    // 📜 Get All Feedback (Admin)
    getAllFeedback: builder.query({
      query: () => ({
        url: '/admin',
        credentials: 'include',
      }),
    }),

    // 📜 Get Feedback by User (Admin)
    getUserFeedback: builder.query({
      query: (userId) => ({
        url: `/admin/user/${userId}`,
        credentials: 'include',
      }),
    }),
  }),
});

export const { 
  useSubmitFeedbackMutation, 
  useGetAllFeedbackQuery, 
  useGetUserFeedbackQuery 
} = feedbackApi;
