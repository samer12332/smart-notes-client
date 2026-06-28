import { Link } from "react-router-dom";

function NotesListPage() {
    return (
        <main className="px-4 py-10">
            <section className="mx-auto max-w-5xl">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Notes</h1>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">
                            Notes list will be built on Day 4.
                        </p>
                    </div>

                    <Link
                        to="/notes/create"
                        className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white dark:bg-slate-100 dark:text-slate-950"
                    >
                        Create Note
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default NotesListPage;
