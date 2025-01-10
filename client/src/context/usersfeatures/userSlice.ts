import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        name: null,
        email: null,
        token: null,
    },
    reducers: {
        signin: (state, action) => {
            const { email } = action.payload;
            state.email = email;
        },
        authenticated: (state, action) => {
            const { token, email, name } = action.payload;
            state.token = token;
            state.email = email;
            state.name = name;
        },
        signOut: (state) => {
            state.token = null;
            state.email = null;
            state.name = null;
        },
    },
});

export const { signin, authenticated, signOut } = userSlice.actions;
export default userSlice.reducer;
