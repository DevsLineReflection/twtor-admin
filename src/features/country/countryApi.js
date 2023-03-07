import { apiSlice } from "../api/apiSlice";

export const countryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getcountry: builder.query({
      query: () => `/api/admin/country`,
    }),
  }),
});

export const { useGetcountryQuery } = countryApi;
