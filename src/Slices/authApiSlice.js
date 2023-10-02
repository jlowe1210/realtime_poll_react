import apiSlice from "./apiSlice";
import { logout } from "./authSlice";

const baseUrl = "/api/auth";

const authApiSliceWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["USER", "PROFILE"],
});

export const authApiSlice = authApiSliceWithTag.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => {
        return {
          url: `${baseUrl}/profile`,
          method: "GET",
        };
      },
      providesTags: ["PROFILE"],
    }),

    login: builder.mutation({
      query: (credential) => {
        return {
          url: `${baseUrl}/login`,
          method: "POST",
          body: credential,
        };
      },
      providesTags: ["USER"],
    }),
    signup: builder.mutation({
      query: (body) => {
        return {
          url: `${baseUrl}/signup`,
          method: "POST",
          body: body,
        };
      },
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: `${baseUrl}/logout`,
          method: "POST",
          body: {},
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const optimisticLogout = dispatch(logout());

        try {
          await queryFulfilled;
        } catch (error) {
          optimisticLogout.undo();
        }
      },
      invalidatesTags: ["PROFILE", "USER"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useProfileQuery,
} = authApiSlice;
