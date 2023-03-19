import { apiSlice } from "../api/apiSlice";

export const languageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLanguage: builder.query({
      query: () => `/api/admin/language`,
    }),
    createLanguage: builder.mutation({
      query: (data) => ({
        url: "/api/admin/language",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getLanguage",
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

export const { useGetLanguageQuery, useCreateLanguageMutation } = languageApi;
