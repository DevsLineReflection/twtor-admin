import { apiSlice } from "../api/apiSlice";

export const popularityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserSolutionPopularity: builder.query({
      query: () => `/api/get_user_given_solution_popularity/0`,
    }),
    createSolutionPopularity: builder.mutation({
      query: (formData) => ({
        url: "/api/popularity",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (typeof result.data.popularity == "object") {
            dispatch(
              apiSlice.util.updateQueryData(
                "getbookclub",
                arg.bookclub_id.toString(),
                (draft) => {
                  const bookclub_book_index = draft.books.findIndex(
                    (c) => parseInt(c.id) == arg.book_id
                  );
                  const bookclub_book_chapter_index = draft.books[
                    bookclub_book_index
                  ].chapter.findIndex((c) => parseInt(c.id) == arg.chapter_id);
                  const bookclub_book_chapter_problem_index = draft.books[
                    bookclub_book_index
                  ].chapter[bookclub_book_chapter_index].problems.findIndex(
                    (c) => parseInt(c.id) == arg.problem_id
                  );
                  const bookclub_book_chapter_problem_solutiom_index =
                    draft.books[bookclub_book_index].chapter[
                      bookclub_book_chapter_index
                    ].problems[
                      bookclub_book_chapter_problem_index
                    ].soluation.findIndex((c) => parseInt(c.id) == arg.type_id);

                  draft.books[bookclub_book_index].chapter[
                    bookclub_book_chapter_index
                  ].problems[bookclub_book_chapter_problem_index].soluation[
                    bookclub_book_chapter_problem_solutiom_index
                  ].total_popularity.push(result.data.popularity);
                  console.log(JSON.stringify(draft));
                  return draft;
                }
              )
            );
            dispatch(
              apiSlice.util.updateQueryData(
                "getUserSolutionPopularity",
                undefined,
                (draft) => {
                  draft.push(result.data.popularity);
                  return draft;
                }
              )
            );
          } else {
            if (result.data.popularity) {
              dispatch(
                apiSlice.util.updateQueryData(
                  "getbookclub",
                  arg.bookclub_id.toString(),
                  (draft) => {
                    const bookclub_book_index = draft.books.findIndex(
                      (c) => parseInt(c.id) == arg.book_id
                    );
                    const bookclub_book_chapter_index = draft.books[
                      bookclub_book_index
                    ].chapter.findIndex(
                      (c) => parseInt(c.id) == arg.chapter_id
                    );
                    const bookclub_book_chapter_problem_index = draft.books[
                      bookclub_book_index
                    ].chapter[bookclub_book_chapter_index].problems.findIndex(
                      (c) => parseInt(c.id) == arg.problem_id
                    );
                    const bookclub_book_chapter_problem_solutiom_index =
                      draft.books[bookclub_book_index].chapter[
                        bookclub_book_chapter_index
                      ].problems[
                        bookclub_book_chapter_problem_index
                      ].soluation.findIndex(
                        (c) => parseInt(c.id) == arg.type_id
                      );

                    draft.books[bookclub_book_index].chapter[
                      bookclub_book_chapter_index
                    ].problems[bookclub_book_chapter_problem_index].soluation[
                      bookclub_book_chapter_problem_solutiom_index
                    ].total_popularity = draft.books[
                      bookclub_book_index
                    ].chapter[bookclub_book_chapter_index].problems[
                      bookclub_book_chapter_problem_index
                    ].soluation[
                      bookclub_book_chapter_problem_solutiom_index
                    ].total_popularity.filter(
                      (item) => !(item.id == result.data.popularity)
                    );
                    console.log(JSON.stringify(draft));
                    return draft;
                  }
                )
              );
              dispatch(
                apiSlice.util.updateQueryData(
                  "getUserSolutionPopularity",
                  undefined,
                  (draft) => {
                    return draft.filter(
                      (item) => !(item.id == result.data.popularity)
                    );
                  }
                )
              );
            }
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useCreateSolutionPopularityMutation,
  useGetUserSolutionPopularityQuery,
} = popularityApi;
