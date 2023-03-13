import { apiSlice } from "../api/apiSlice";

export const karmapointApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKarmaPointHistory: builder.query({
      query: () => `/api/admin/getKarmaPointsTransactionHistory`,
      providesTags: ["KarmaPointHistory"],
    }),
    getKarmapointsBalance: builder.query({
      query: () => `/api/admin/getTotalKarmaPoints`,
      providesTags: ["KarmaPointAccount"],
    }),
    createInKarmaPoints: builder.mutation({
      query: (data) => ({
        url: "/api/admin/addKarmaPoint",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (err) {
          // do nothing
        }
      },
      invalidatesTags: ["KarmaPointAccount", "KarmaPointHistory"],
    }),
    getKarmapointsSettings: builder.query({
      query: () => `/api/admin/point-price-settings`,
      providesTags: ["KarmaPointSettings"],
    }),
    createKarmaPointsSettings: builder.mutation({
      query: (data) => ({
        url: "/api/admin/point-price-settings",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (err) {
          // do nothing
        }
      },
      invalidatesTags: ["KarmaPointSettings"],
    }),
  }),
});

export const {
  useGetKarmaPointHistoryQuery,
  useGetKarmapointsBalanceQuery,
  useCreateInKarmaPointsMutation,
  useGetKarmapointsSettingsQuery,
  useCreateKarmaPointsSettingsMutation,
} = karmapointApi;
