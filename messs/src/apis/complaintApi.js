import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const complaintApi = createApi({
  reducerPath: 'complaintApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include', // 👈 This line ensures cookies/session are sent
  }),
  tagTypes: ['Complaint'],
  endpoints: (builder) => ({
    createComplaint: builder.mutation({
      query: (body) => ({
        url: '/complaints/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Complaint'],
    }),

    resolveComplaint: builder.mutation({
      query: ({ complaintId, resolution }) => ({
        url: `/complaints/${complaintId}/resolve`,
        method: 'PUT',
        body: { resolution },
      }),
      invalidatesTags: ['Complaint'],
    }),

    rejectComplaint: builder.mutation({
      query: ({ complaintId, resolution }) => ({
        url: `/complaints/${complaintId}/reject`,
        method: 'PUT',
        body: { resolution },
      }),
      invalidatesTags: ['Complaint'],
    }),

    getMyComplaints: builder.query({
      query: () => '/complaints/my',
      providesTags: ['Complaint'],
    }),

    getMyResolvedComplaints: builder.query({
      query: () => '/complaints/my/resolved',
      providesTags: ['Complaint'],
    }),

    getAdminComplaints: builder.query({
      query: () => '/complaints/admin/all',
      providesTags: ['Complaint'],
    }),

    getComplaintById: builder.query({
      query: (id) => `/complaints/${id}`,
      providesTags: ['Complaint'],
    }),
  }),
});

export const {
  useCreateComplaintMutation,
  useResolveComplaintMutation,
  useRejectComplaintMutation,
  useGetMyComplaintsQuery,
  useGetMyResolvedComplaintsQuery,
  useGetAdminComplaintsQuery,
  useGetComplaintByIdQuery,
} = complaintApi;
