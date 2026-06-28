import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthUser } from "./authTypes";

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem("user") || "null") as AuthUser | null,
    token: localStorage.getItem("token"),
};

type LoginPayload = {
    user: AuthUser;
    token: string;
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<LoginPayload>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;

            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },

        logout: (state) => {
            state.user = null;
            state.token = null;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
