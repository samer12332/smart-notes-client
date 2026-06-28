import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api/authApi";
import { useAppDispatch } from "../app/hooks";
import { setCredentials } from "../features/auth/authSlice";
import {
    registerSchema,
    type RegisterFormValues,
} from "../features/auth/authSchemas";
import { getErrorMessage } from "../utils/getErrorMessage";

function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (response) => {
            dispatch(
                setCredentials({
                    user: response.data.user,
                    token: response.data.token,
                }),
            );

            navigate("/dashboard");
        },
    });

    function onSubmit(values: RegisterFormValues) {
        registerMutation.mutate(values);
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
            <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h1 className="text-2xl font-bold">Create account</h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Start organizing your smart notes workspace.
                </p>

                {registerMutation.isError && (
                    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {getErrorMessage(registerMutation.error)}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-6 space-y-4"
                >
                    <div>
                        <label htmlFor="name" className="text-sm font-medium">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-300"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-300"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm font-medium"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-300"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-950"
                    >
                        {registerMutation.isPending
                            ? "Creating account..."
                            : "Register"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-slate-950 underline dark:text-white"
                    >
                        Login
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default RegisterPage;
