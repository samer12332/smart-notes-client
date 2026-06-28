import { useAppSelector } from "../app/hooks";

function ProfilePage() {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
            <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h1 className="text-3xl font-bold">Profile</h1>

                <div className="mt-6 space-y-3">
                    <p>
                        <span className="font-medium">Name:</span>{" "}
                        {user?.name || "Unknown"}
                    </p>

                    <p>
                        <span className="font-medium">Email:</span>{" "}
                        {user?.email || "Unknown"}
                    </p>
                </div>
            </section>
        </main>
    );
}

export default ProfilePage;
