import { apiSlice } from "../api/apiSlice";

export const studygroupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getstudygroups: builder.query({
      query: (page = 1) => `/api/admin/studygroup?page=${page}`,
      providesTags: ["study_groups"],
    }),
    getuserstudygroups: builder.query({
      query: (id) => `/api/admin/studygroup_user/${id}`,
    }),
    getmemberstudygroups: builder.query({
      query: (id) => `/api/admin/user_studygroups/${id}`,
    }),
    getstudygroup: builder.query({
      query: (id) => `/api/admin/studygroup/${id}`,
    }),
    getStudygroupReport: builder.query({
      query: () => `/api/admin/getStudyGroupReport`,
    }),
    createStudyGroup: builder.mutation({
      query: (formData) => ({
        url: "/api/studygroup",
        method: "POST",
        body: formData,
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.study_group) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getuserstudygroups",
                undefined,
                (draft) => {
                  draft.push(result.data.study_group);
                }
              )
            );
            dispatch(
              apiSlice.util.updateQueryData(
                "getstudygroups",
                undefined,
                (draft) => {
                  draft.push(result.data.study_group);
                }
              )
            );
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    updateStudyGroup: builder.mutation({
      query: (data) => ({
        url: "/api/studygroup",
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
    updateStudyGroupSubscription: builder.mutation({
      query: (data) => ({
        url: "/api/admin/change_study_group_subscription",
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.staus == 200) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getstudygroup",
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
    updateStudyGroupStatus: builder.mutation({
      query: (data) => ({
        url: `/api/admin/study-group-status-change/${data.id}`,
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
      invalidatesTags: ["study_groups"],
    }),
  }),
});

export const {
  useGetstudygroupsQuery,
  useGetstudygroupQuery,
  useCreateStudyGroupMutation,
  useUpdateStudyGroupMutation,
  useGetuserstudygroupsQuery,
  useGetmemberstudygroupsQuery,
  useGetStudygroupReportQuery,
  useUpdateStudyGroupSubscriptionMutation,
  useUpdateStudyGroupStatusMutation,
} = studygroupApi;
