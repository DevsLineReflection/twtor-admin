import { apiSlice } from "../api/apiSlice";

export const testimonialApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => `/api/admin/testimonial`,
    }),
    createTestimonial: builder.mutation({
      query: (data) => ({
        url: "/api/admin/testimonial",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getTestimonials",
                undefined,
                (draft) => {
                  draft.unshift(result.data);
                }
              )
            );
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    updateTestimonialStatus: builder.mutation({
      query: (data) => ({
        url: "/api/admin/testimonial-status",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getTestimonials",
                undefined,
                (draft) => {
                  let findIndex = draft.findIndex(item => item.id == result.id);
                  draft[findIndex] = result.data;
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

export const { useCreateTestimonialMutation, useGetTestimonialsQuery, useUpdateTestimonialStatusMutation } = testimonialApi;
