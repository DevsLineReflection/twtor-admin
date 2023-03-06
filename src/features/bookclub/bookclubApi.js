import { apiSlice } from '../api/apiSlice'

export const bookclubApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getbookclubs: builder.query({
            query: () => `/api/bookclub`,
        }),
        getuserbookclubs: builder.query({
            query: () => `/api/user_bookclub`,
        }),
        getbookclub: builder.query({
            query: id => `/api/bookclub/${id}`,
        }),
        createBookClub: builder.mutation({
            query: formData => ({
                url: '/api/bookclub',
                method: 'POST',
                body: formData,
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    if (result.data.book_club) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getuserbookclubs',
                                undefined,
                                draft => {
                                    draft.push(result.data.book_club)
                                },
                            ),
                        )
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getbookclubs',
                                undefined,
                                draft => {
                                    draft.push(result.data.book_club)
                                },
                            ),
                        )
                    }
                } catch (err) {
                    // do nothing
                }
            },
        }),
        updateBookClub: builder.mutation({
            query: data => ({
                url: '/api/bookclub',
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
    useGetbookclubsQuery,
    useGetbookclubQuery,
    useCreateBookClubMutation,
    useUpdateBookClubMutation,
    useGetuserbookclubsQuery,
} = bookclubApi
