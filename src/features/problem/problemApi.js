import { apiSlice } from "../api/apiSlice";

export const problemApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProblem: builder.mutation({
      query: (data) => ({
        url: "/api/problem",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.study_group_problem) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getstudygroup",
                arg.studygroup_id.toString(),
                (draft) => {
                  const studygroup_book_index = draft.books.findIndex(
                    (c) =>
                      parseInt(c.id) == result.data.study_group_problem.book_id
                  );
                  const studygroup_book_chapter_index = draft.books[
                    studygroup_book_index
                  ].chapter.findIndex(
                    (c) =>
                      parseInt(c.id) ==
                      result.data.study_group_problem.chapter_id
                  );

                  draft.books[studygroup_book_index].chapter[
                    studygroup_book_chapter_index
                  ] = {
                    ...draft.books[studygroup_book_index].chapter[
                      studygroup_book_chapter_index
                    ],
                    problems: [
                      ...draft.books[studygroup_book_index].chapter[
                        studygroup_book_chapter_index
                      ].problems,
                      result.data.study_group_problem,
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
    updateProblem: builder.mutation({
      query: (data) => ({
        url: "/api/problem",
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

export const { useCreateProblemMutation, useUpdateProblemMutation } =
  problemApi;
