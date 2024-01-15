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
                  draft.push(result.data);
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

export const { useCreateTestimonialMutation, useGetTestimonialsQuery } = testimonialApi;
