import { apiSlice } from "../api/apiSlice";

export const zoomApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getZoomAccount: builder.query({
      query: () => `/api/admin/zoom-accounts`,
    }),
    createZoomAccount: builder.mutation({
      query: (data) => ({
        url: "/api/admin/zoom-accounts",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getZoomAccount",
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

export const { useGetZoomAccountQuery, useCreateZoomAccountMutation } = zoomApi;
