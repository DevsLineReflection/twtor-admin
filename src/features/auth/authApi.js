import { apiSlice } from '../api/apiSlice'
import { userLoggedIn, userLoggedOut } from './authSlice'


export const authApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: data => ({
                url: '/register',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    debugger
                    localStorage.setItem(
                        'auth',
                        JSON.stringify({
                            user: result.data.user,
                        }),
                    )
                    dispatch(
                        userLoggedIn({
                            user: result.data.user,
                        }),
                    )
                } catch (err) {
                    // do nothing
                }
            },
        }),
        login: builder.mutation({
            query: data => ({
                url: '/login-admin',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    //debugger

                    localStorage.setItem(
                        'auth',
                        JSON.stringify({
                            user: result.data.user,
                        }),
                    )

                    dispatch(
                        userLoggedIn({
                            user: result.data.user,
                        }),
                    )
                } catch (err) {
                    // do nothing
                }
            },
        }),
        logout: builder.mutation({
            query: data => ({
                url: '/logout',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled

                    // localStorage.setItem(
                    //     'auth',
                    //     JSON.stringify({
                    //         accessToken: result.data.accessToken,
                    //         user: result.data.user,
                    //     }),
                    // )

                    localStorage.clear()
                   

                    dispatch(
                        userLoggedOut({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        }),
                    )
                } catch (err) {
                    // do nothing
                }
            },
        }),
        verifysso: builder.mutation({
            query: data => ({
                url: '/verifysso',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    debugger
                    if (
                        result?.data?.status &&
                        result?.data?.status === 'Invalid Request'
                    ) {
                        localStorage.clear()
                       
                        dispatch(
                            userLoggedOut({
                                accessToken: result.data.accessToken,
                                user: result.data.user,
                            }),
                        )
                    } else {
                        localStorage.setItem(
                            'auth',
                            JSON.stringify({
                                user: result.data.user,
                            }),
                        )
                        dispatch(
                            userLoggedIn({
                                user: result.data.user,
                            }),
                        )
                    }
                } catch (err) {
                    // do nothing
                }
            },
        }),
        resendemailverification: builder.mutation({
            query: data => ({
                url: '/email/verification-notification',
                method: 'POST',
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
        resetpassword: builder.mutation({
            query: data => ({
                url: '/reset-password',
                method: 'POST',
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
        forgotpassword: builder.mutation({
            query: data => ({
                url: '/forgot-password',
                method: 'POST',
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
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useVerifyssoMutation,
    useForgotpasswordMutation,
    useResetpasswordMutation,
    useResendemailverificationMutation,
} = authApi
