import { apiSlice } from '../api/apiSlice'

export const solutionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSolution: builder.mutation({
      query: (formData) => ({
        url: '/api/solution',
        method: 'POST',
        body: formData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled

          if (result.data.book_club_problem_solution) {
            dispatch(
              apiSlice.util.updateQueryData(
                'getbookclub',
                result.data.book_id.toString(),
                (draft) => {
                  const bookclub_book_index = draft.books.findIndex(
                    (c) => parseInt(c.id) == result.data.book_id,
                  )
                  const bookclub_book_chapter_index = draft.books[
                    bookclub_book_index
                  ].chapter.findIndex((c) => parseInt(c.id) == result.data.chapter_id)
                  const bookclub_book_chapter_problem_index = draft.books[
                    bookclub_book_index
                  ].chapter[bookclub_book_chapter_index].problems.findIndex(
                    (c) => parseInt(c.id) == result.data.book_club_problem_solution.problem_id,
                  )

                  draft.books[bookclub_book_index].chapter[bookclub_book_chapter_index].problems[
                    bookclub_book_chapter_problem_index
                  ] = {
                    ...draft.books[bookclub_book_index].chapter[bookclub_book_chapter_index]
                      .problems[bookclub_book_chapter_problem_index],
                    soluation: [
                      ...draft.books[bookclub_book_index].chapter[bookclub_book_chapter_index]
                        .problems[bookclub_book_chapter_problem_index].soluation,
                      result.data.book_club_problem_solution,
                    ],
                  }
                  console.log(JSON.stringify(draft))
                  return draft
                },
              ),
            )
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    updateSolution: builder.mutation({
      query: (data) => ({
        url: '/api/solution',
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
})

export const { useCreateSolutionMutation, useUpdateSolutionMutation } = solutionApi
