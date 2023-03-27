import { apiSlice } from "../api/apiSlice";

export const bookclubApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getbookclubs: builder.query({
      query: (page = 1) => `/api/admin/bookclub?page=${page}`,
    }),
    getuserbookclubs: builder.query({
      query: (id) => `/api/admin/bookclub_user/${id}`,
    }),
    getmemberbookclubs: builder.query({
      query: (id) => `/api/admin/user_bookclubs/${id}`,
    }),
    getbookclub: builder.query({
      query: (id) => `/api/admin/bookclub/${id}`,
    }),
    getBookclubReport: builder.query({
      query: () => `/api/admin/getBookclubReport`,
    }),
    createBookClub: builder.mutation({
      query: (formData) => ({
        url: "/api/bookclub",
        method: "POST",
        body: formData,
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.book_club) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getuserbookclubs",
                undefined,
                (draft) => {
                  draft.push(result.data.book_club);
                }
              )
            );
            dispatch(
              apiSlice.util.updateQueryData(
                "getbookclubs",
                undefined,
                (draft) => {
                  draft.push(result.data.book_club);
                }
              )
            );
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    updateBookClub: builder.mutation({
      query: (data) => ({
        url: "/api/bookclub",
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (err) {
          // do nothing
        }
      },
    }),
    updateBookClubSubscription: builder.mutation({
      query: (data) => ({
        url: "/api/admin/change_book_club_subscription",
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.staus == 200) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getbookclub",
                arg.id.toString(),
                (draft) => {
                  draft = { ...draft, subscription_type: arg.val ? 1 : 0 };
                  console.log(JSON.stringify(draft));
                  return draft;
                }
              )
            );
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useGetbookclubsQuery,
  useGetbookclubQuery,
  useCreateBookClubMutation,
  useUpdateBookClubMutation,
  useGetuserbookclubsQuery,
  useGetmemberbookclubsQuery,
  useGetBookclubReportQuery,
  useUpdateBookClubSubscriptionMutation,
} = bookclubApi;
