import { apiSlice } from "../api/apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayment: builder.query({
      query: () => `/api/admin/payment`,
    }),
    getTotalPayment: builder.query({
      query: () => `/api/admin/payment/total`,
    }),
  }),
});

export const { useGetTotalPaymentQuery, useGetAllPaymentQuery } = paymentApi;
