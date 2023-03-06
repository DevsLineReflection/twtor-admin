import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedOut } from '../auth/authSlice'
import axios from '../../lib/axios'
// import { getCookie } from 'cookies-next'

const csrf = () => axios.get('/sanctum/csrf-cookie')

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_PUBLIC_BACKEND_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
        // const token = getState()?.auth?.accessToken
        // if (token) {
        //     headers.set('Authorization', `Bearer ${token}`)
        // }
        // headers.set('Authorization', `Bearer ${token}`)
        await csrf()
        const token = decodeURIComponent(
            // getCookie('XSRF-TOKEN')
            )
        headers.set('X-XSRF-TOKEN', token)
        // if (!headers.has('Content-Type')) {
        //     headers.set('Content-Type', 'application/json')
        // }
        headers.set('X-Requested-With', `XMLHttpRequest`)
        headers.set('Access-Control-Allow-Origin', '*')

        return headers
    },
    credentials: 'include',
})

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions)
        if (result?.error?.status === 401) {
            api.dispatch(userLoggedOut())
            localStorage.clear()
        }
        return result
    },
    tagTypes: [],
    endpoints: builder => ({}),
})
