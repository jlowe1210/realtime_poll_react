import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "", credentials: "include" });

const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});

export default apiSlice;
