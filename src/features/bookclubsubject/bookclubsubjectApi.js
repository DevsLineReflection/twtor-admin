import { apiSlice } from "../api/apiSlice";

export const bookclubsubjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookClubSubjects: builder.query({
      query: () => `/api/bookclubsubject`,
    }),
    createBookClubSubjects: builder.mutation({
      query: (data) => ({
        url: "/api/admin/bookclubsubject",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getBookClubSubjects",
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
  useGetBookClubSubjectsQuery,
  useCreateBookClubSubjectsMutation,
} = bookclubsubjectApi;
