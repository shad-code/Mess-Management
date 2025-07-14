import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/payments', // Replace with your backend URL
    credentials: 'include', // This will include cookies in the request
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (amount) => ({
        url: '/create-order',
        method: 'POST',
        body: { amount },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }),
    }),
    verifyPayment: builder.mutation({
      query: ({ razorpay_payment_id, razorpay_order_id, razorpay_signature }) => ({
        url: '/verify',
        method: 'POST',
        body: { razorpay_payment_id, razorpay_order_id, razorpay_signature },
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useVerifyPaymentMutation } = paymentApi;
