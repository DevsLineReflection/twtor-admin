import { apiSlice } from "../api/apiSlice";

export const gradeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getgrade: builder.query({
      query: () => `/api/admin/grade`,
    }),
    createGrade: builder.mutation({
      query: (data) => ({
        url: "/api/admin/grade",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData("getgrade", undefined, (draft) => {
                draft.push(result.data);
              })
            );
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useGetgradeQuery, useCreateGradeMutation } = gradeApi;
