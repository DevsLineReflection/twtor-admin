import { apiSlice } from "../api/apiSlice";

export const countryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getcountry: builder.query({
      query: () => `/api/admin/country`,
    }),
    createCountry: builder.mutation({
      query: (data) => ({
        url: "/api/admin/country",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getcountry",
                undefined,
                (draft) => {
                  draft.push(result.data);
                }
              )
            );
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useGetcountryQuery, useCreateCountryMutation } = countryApi;
