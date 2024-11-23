import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/database";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    putProfilePicture: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profilePicture/${localId}.json`,
        method: "PUT",
        body: { image: image },
      }),
    }),
    getProfilePicture: builder.query({
      query: (localId) => `profilePicture/${localId}.json`,
    }),
  }),
});

export const { usePutProfilePictureMutation, useGetProfilePictureQuery } =
  userApi;
