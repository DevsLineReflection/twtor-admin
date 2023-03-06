import { apiSlice } from '../api/apiSlice'

export const bookApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getChapters: builder.query({
            query: id => `/api/chapter/${id}`,
        }),
        createChapter: builder.mutation({
            query: data => ({
                url: '/api/chapter',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    debugger
                    const result = await queryFulfilled
                    if (
                        result.data.book_club_chapter &&
                        result.data.book_club_chapter.book_id
                    ) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getbookclub',
                                arg.bookclub_id.toString(),
                                draft => {
                                    const bookclub_book_index = draft.books.findIndex(
                                        c =>
                                            parseInt(c.id) ==
                                            result.data.book_club_chapter
                                                .book_id,
                                    )

                                    draft.books[bookclub_book_index] = {
                                        ...draft.books[bookclub_book_index],
                                        chapter: [
                                            ...draft.books[bookclub_book_index]
                                                .chapter,
                                            result.data.book_club_chapter,
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
        updateChapter: builder.mutation({
            query: data => ({
                url: '/api/chapter',
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

export const {
    useGetChaptersQuery,
    useCreateChapterMutation,
    useUpdateChapterMutation,
} = bookApi
