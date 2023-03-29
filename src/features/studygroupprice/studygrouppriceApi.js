import { apiSlice } from "../api/apiSlice";

export const subscriptionbandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getstudygroupprices: builder.query({
      query: () => `/api/admin/studygroupprice`,
    }),
    getstudygroupprice: builder.query({
      query: (id) => `/api/admin/get_study_group_price/${id}`,
    }),
    createstudygroupprice: builder.mutation({
      query: (data) => ({
        url: "/api/admin/studygroupprice",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useCreatestudygrouppriceMutation,
  useGetstudygrouppriceQuery,
  useLazyGetstudygrouppricesQuery,
} = subscriptionbandApi;
