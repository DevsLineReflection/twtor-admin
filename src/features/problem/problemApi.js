import { apiSlice } from '../api/apiSlice'

export const problemApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createProblem: builder.mutation({
            query: data => ({
                url: '/api/problem',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    if (result.data.book_club_problem) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getbookclub',
                                arg.bookclub_id.toString(),
                                draft => {
                                    const bookclub_book_index = draft.books.findIndex(
                                        c =>
                                            parseInt(c.id) ==
                                            result.data.book_club_problem
                                                .book_id,
                                    )
                                    const bookclub_book_chapter_index = draft.books[
                                        bookclub_book_index
                                    ].chapter.findIndex(
                                        c =>
                                            parseInt(c.id) ==
                                            result.data.book_club_problem
                                                .chapter_id,
                                    )

                                    draft.books[bookclub_book_index].chapter[
                                        bookclub_book_chapter_index
                                    ] = {
                                        ...draft.books[bookclub_book_index]
                                            .chapter[
                                            bookclub_book_chapter_index
                                        ],
                                        problems: [
                                            ...draft.books[bookclub_book_index]
                                                .chapter[
                                                bookclub_book_chapter_index
                                            ].problems,
                                            result.data.book_club_problem,
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
        updateProblem: builder.mutation({
            query: data => ({
                url: '/api/problem',
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

export const { useCreateProblemMutation, useUpdateProblemMutation } = problemApi
