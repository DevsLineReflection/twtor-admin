import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page = 1) => `/api/admin/user?page=${page}`,
    }),
    getUser: builder.query({
      query: () => `/api/get_user`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          //debugger
          localStorage.setItem(
            "auth",
            JSON.stringify({
              user: result.data,
            })
          );

          dispatch(
            userLoggedIn({
              user: result.data,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    inviteMembers: builder.mutation({
      query: (data) => ({
        url: "/api/member/invite",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserQuery, useInviteMembersMutation, useGetUsersQuery } =
  userApi;
export const { getUser, getUsers } = userApi.endpoints;
