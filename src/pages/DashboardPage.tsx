import { Link } from "react-router-dom";

import { useAppSelector } from "../app/hooks";

function DashboardPage() {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <main className="px-4 py-10">
            <section className="mx-auto max-w-5xl">
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Welcome back
                    </p>

                    <h1 className="mt-2 text-3xl font-bold">
                        {user?.name || "Smart Notes User"}
                    </h1>

                    <p className="mt-3 text-slate-600 dark:text-slate-300">
                        Your workspace is ready. Jump into your notes, create
                        something new, or continue organizing what you already
                        have.
                    </p>

                    <div className="mt-6">
                        <Link
                            to="/notes"
                            className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white dark:bg-slate-100 dark:text-slate-950"
                        >
                            Go to Notes
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default DashboardPage;
