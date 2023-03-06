import { apiSlice } from '../api/apiSlice'

export const languageApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getlanguages: builder.query({
            query: () => `/api/language`,
        }),
    }),
})

export const { useGetlanguagesQuery } = languageApi
