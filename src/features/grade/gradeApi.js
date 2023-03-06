import { apiSlice } from '../api/apiSlice'

export const gradeApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getgrade: builder.query({
            query: () => `/api/grade`,
        }),
    }),
})

export const { useGetgradeQuery } = gradeApi
