import { apiSlice } from "../api/apiSlice";

export const gradeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getgrade: builder.query({
      query: () => `/api/admin/grade`,
    }),
  }),
});

export const { useGetgradeQuery } = gradeApi;
