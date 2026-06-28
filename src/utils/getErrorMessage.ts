import axios from "axios";

type ApiErrorResponse = {
    message?: string;
};

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
        return error.response?.data?.message || "Something went wrong";
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Something went wrong";
}
