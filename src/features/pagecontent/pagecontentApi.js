import { apiSlice } from "../api/apiSlice";

export const pagecontentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getpagecontent: builder.query({
      query: () => `/api/admin/pagecontent`,
      providesTags: ["Pagecontent"],
    }),
    createpagecontent: builder.mutation({
      query: (data) => ({
        url: "/api/admin/pagecontent",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Pagecontent"],
    }),
  }),
});

export const { useGetpagecontentQuery, useCreatepagecontentMutation } =
  pagecontentApi;
