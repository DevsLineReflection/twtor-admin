import { apiSlice } from '../api/apiSlice'

export const bookclubsubjectApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBookClubSubjects: builder.query({
            query: () => `/api/bookclubsubject`,
        }),
    }),
})

export const { useGetBookClubSubjectsQuery } = bookclubsubjectApi
