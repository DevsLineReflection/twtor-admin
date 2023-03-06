import { apiSlice } from '../api/apiSlice'

export const languageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLanguage: builder.query({
      query: () => `/api/language`,
    }),
  }),
})

export const { useGetLanguageQuery } = languageApi
