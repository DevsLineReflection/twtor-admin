import { apiSlice } from "../api/apiSlice";

export const subscriptionbandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionband: builder.query({
      query: () => `/api/admin/subscriptionband`,
    }),
    createSubscriptionband: builder.mutation({
      query: (data) => ({
        url: "/api/admin/subscriptionband",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            debugger;
            dispatch(
              apiSlice.util.updateQueryData(
                "getSubscriptionband",
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

export const {
  useGetSubscriptionbandQuery,
  useCreateSubscriptionbandMutation,
} = subscriptionbandApi;
