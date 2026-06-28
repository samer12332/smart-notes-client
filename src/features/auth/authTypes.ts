export type AuthUser = {
    id: string;
    name: string;
    email: string;
};

export type AuthState = {
    user: AuthUser | null;
    token: string | null;
};
