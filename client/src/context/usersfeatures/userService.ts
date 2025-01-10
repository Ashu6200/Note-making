import { apiService } from "../apiService";
import { authenticated } from "./userSlice";

export const userService = apiService.injectEndpoints({
    endpoints: builder => ({
        signupService: builder.mutation({
            query: (data) => ({
                url: "/user/signup",
                method: "POST",
                body: data,
                credentials: 'include' as const,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    const { data } = result.data;
                    if (!data) {
                        throw new Error("Invalid response data");
                    }
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        verfiyOTPService: builder.mutation({
            query: (data) => ({
                url: "/user/verify",
                method: "POST",
                body: data,
                credentials: 'include' as const,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    const { data } = result;
                    dispatch(authenticated({ token: data.data.token, email: data.data.email, name: data.data.name }))
                } catch (error) {
                    console.error(error);
                }
            },
        })

    })
})
export const { useSignupServiceMutation, useVerfiyOTPServiceMutation } = userService