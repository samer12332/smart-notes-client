import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { getNoteById } from "../api/notesApi";
import { getErrorMessage } from "../utils/getErrorMessage";

function NoteDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const noteQuery = useQuery({
        queryKey: ["note", id],
        queryFn: () => getNoteById(id as string),
        enabled: Boolean(id),
    });

    if (noteQuery.isLoading) {
        return (
            <main className="px-4 py-10">
                <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    Loading note details...
                </section>
            </main>
        );
    }

    if (noteQuery.isError) {
        return (
            <main className="px-4 py-10">
                <section className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
                    {getErrorMessage(noteQuery.error)}
                </section>
            </main>
        );
    }

    const note = noteQuery.data?.data.note;

    if (!note) {
        return (
            <main className="px-4 py-10">
                <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    Note not found.
                </section>
            </main>
        );
    }

    return (
        <main className="px-4 py-10">
            <section className="mx-auto max-w-3xl">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        to="/notes"
                        className="text-sm font-medium text-slate-600 underline hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                        Back to notes
                    </Link>

                    <Link
                        to={`/notes/${note._id}/edit`}
                        className="w-fit rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-950"
                    >
                        Edit Note
                    </Link>
                </div>

                <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                {note.category}
                            </p>

                            <h1 className="mt-2 text-3xl font-bold">
                                {note.isPinned ? "📌 " : ""}
                                {note.title}
                            </h1>
                        </div>

                        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                            {note.status}
                        </span>
                    </div>

                    <div className="mt-6 whitespace-pre-wrap leading-7 text-slate-700 dark:text-slate-200">
                        {note.content}
                    </div>

                    {note.tags.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {note.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="mt-8 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                        <p>
                            Created: {new Date(note.createdAt).toLocaleString()}
                        </p>
                        <p className="mt-1">
                            Updated: {new Date(note.updatedAt).toLocaleString()}
                        </p>
                    </div>
                </article>
            </section>
        </main>
    );
}

export default NoteDetailsPage;
