import apiSlice from "./apiSlice";

const baseUrl = "/api/poll";

const PollApiSliceWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["POLL"],
});

export const pollApiSlice = PollApiSliceWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getPoll: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `${baseUrl}/${id}`,
        };
      },
      providesTags: ["POLL"],
      keepUnusedDataFor: 0.001,
    }),
    vote: builder.mutation({
      query: (voteBody) => {
        return {
          url: `${baseUrl}/vote`,
          method: "POST",
          body: voteBody,
        };
      },
    }),
    createPoll: builder.mutation({
      query: (pollBody) => {
        return {
          url: `${baseUrl}/create`,
          method: "POST",
          body: pollBody,
        };
      },
      invalidatesTags: ["PROFILE"],
    }),
  }),
});

export const { useGetPollQuery, useVoteMutation, useCreatePollMutation } =
  pollApiSlice;
