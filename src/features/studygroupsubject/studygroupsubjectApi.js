import { apiSlice } from "../api/apiSlice";

export const studtgroupsubjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudyGroupSubjects: builder.query({
      query: () => `/api/studygroupsubject`,
    }),
    createStudyGroupSubjects: builder.mutation({
      query: (data) => ({
        url: "/api/admin/studygroupsubject",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getStudyGroupSubjects",
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
  useGetStudyGroupSubjectsQuery,
  useCreateStudyGroupSubjectsMutation,
} = studtgroupsubjectApi;
