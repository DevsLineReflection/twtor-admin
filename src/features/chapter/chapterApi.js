import { apiSlice } from "../api/apiSlice";

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChapters: builder.query({
      query: (id) => `/api/chapter/${id}`,
    }),
    createChapter: builder.mutation({
      query: (data) => ({
        url: "/api/chapter",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (
            result.data.study_group_chapter &&
            result.data.study_group_chapter.book_id
          ) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getstudygroup",
                arg.studygroup_id.toString(),
                (draft) => {
                  const studygroup_book_index = draft.books.findIndex(
                    (c) =>
                      parseInt(c.id) == result.data.study_group_chapter.book_id
                  );

                  draft.books[studygroup_book_index] = {
                    ...draft.books[studygroup_book_index],
                    chapter: [
                      ...draft.books[studygroup_book_index].chapter,
                      result.data.study_group_chapter,
                    ],
                  };
                  console.log(JSON.stringify(draft));
                  return draft;
                }
              )
            );
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    updateChapter: builder.mutation({
      query: (data) => ({
        url: "/api/chapter",
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useGetChaptersQuery,
  useCreateChapterMutation,
  useUpdateChapterMutation,
} = bookApi;
