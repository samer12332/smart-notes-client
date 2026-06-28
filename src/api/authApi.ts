import { axiosInstance } from "./axiosInstance";
import type { AuthUser } from "../features/auth/authTypes";

export type RegisterInput = {
    name: string;
    email: string;
    password: string;
};

export type LoginInput = {
    email: string;
    password: string;
};

export type AuthResponse = {
    success: boolean;
    message: string;
    data: {
        user: AuthUser;
        token: string;
    };
};

export type MeResponse = {
    success: boolean;
    data: {
        user: AuthUser;
    };
};

export async function registerUser(data: RegisterInput): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
        "/auth/register",
        data,
    );

    return response.data;
}

export async function loginUser(data: LoginInput): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
        "/auth/login",
        data,
    );

    return response.data;
}

export async function getCurrentUser(): Promise<MeResponse> {
    const response = await axiosInstance.get<MeResponse>("/auth/me");

    return response.data;
}
