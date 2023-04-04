import { apiSlice } from "../api/apiSlice";

export const solutionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSolution: builder.mutation({
      query: (formData) => ({
        url: "/api/solution",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.data.study_group_problem_solution) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getstudygroup",
                result.data.book_id.toString(),
                (draft) => {
                  const studygroup_book_index = draft.books.findIndex(
                    (c) => parseInt(c.id) == result.data.book_id
                  );
                  const studygroup_book_chapter_index = draft.books[
                    studygroup_book_index
                  ].chapter.findIndex(
                    (c) => parseInt(c.id) == result.data.chapter_id
                  );
                  const studygroup_book_chapter_problem_index = draft.books[
                    studygroup_book_index
                  ].chapter[studygroup_book_chapter_index].problems.findIndex(
                    (c) =>
                      parseInt(c.id) ==
                      result.data.study_group_problem_solution.problem_id
                  );

                  draft.books[studygroup_book_index].chapter[
                    studygroup_book_chapter_index
                  ].problems[studygroup_book_chapter_problem_index] = {
                    ...draft.books[studygroup_book_index].chapter[
                      studygroup_book_chapter_index
                    ].problems[studygroup_book_chapter_problem_index],
                    soluation: [
                      ...draft.books[studygroup_book_index].chapter[
                        studygroup_book_chapter_index
                      ].problems[studygroup_book_chapter_problem_index]
                        .soluation,
                      result.data.study_group_problem_solution,
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
    updateSolution: builder.mutation({
      query: (data) => ({
        url: "/api/solution",
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

export const { useCreateSolutionMutation, useUpdateSolutionMutation } =
  solutionApi;
