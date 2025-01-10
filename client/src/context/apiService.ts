import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

const apiUrl = import.meta.env.VITE_SERVER_URL
console.log(apiUrl);
const baseQuery = fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.user?.token;
        if (token) {
            headers.set('Content-Type', 'application/json');
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});


export const apiService = createApi({
    reducerPath: "notemaking",
    baseQuery,
    tagTypes: ['Note'],
    endpoints: (builder) => ({
        liveserver: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            async onQueryStarted(_args, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.error(error)
                }
            }

        })
    }),
});
export const { useLiveserverQuery } = apiService