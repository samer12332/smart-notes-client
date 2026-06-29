import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";

import { deleteNote, getNotes } from "../api/notesApi";
import type { NotesQueryParams } from "../features/notes/noteTypes";
import { getErrorMessage } from "../utils/getErrorMessage";
import { useEffect, useRef, useState } from "react";

function NotesListPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient();

    const search = searchParams.get("search") || "";
    const [searchInput, setSearchInput] = useState(search);

    const category = searchParams.get("category") || "";
    const status = (searchParams.get("status") ||
        "") as NotesQueryParams["status"];
    const sortBy = (searchParams.get("sortBy") ||
        "createdAt") as NotesQueryParams["sortBy"];
    const sortOrder = (searchParams.get("sortOrder") ||
        "desc") as NotesQueryParams["sortOrder"];

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "6");

    const searchTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                window.clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    const queryParams: NotesQueryParams = {
        search,
        category,
        status,
        sortBy,
        sortOrder,
        page,
        limit,
    };

    const notesQuery = useQuery({
        queryKey: ["notes", queryParams],
        queryFn: () => getNotes(queryParams),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    function updateParam(key: string, value: string) {
        const nextParams = new URLSearchParams(searchParams);

        if (value) {
            nextParams.set(key, value);
        } else {
            nextParams.delete(key);
        }

        if (key !== "page") {
            nextParams.set("page", "1");
        }

        setSearchParams(nextParams);
    }

    function handleSearchChange(value: string) {
        setSearchInput(value);

        if (searchTimeoutRef.current) {
            window.clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = window.setTimeout(() => {
            updateParam("search", value);
        }, 500);
    }

    function handleDelete(noteId: string) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this note?",
        );

        if (!confirmed) {
            return;
        }

        deleteMutation.mutate(noteId);
    }

    const notes = notesQuery.data?.data.notes || [];
    const pagination = notesQuery.data?.pagination;

    return (
        <main className="px-4 py-10">
            <section className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Notes</h1>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">
                            Search, filter, sort, and manage your notes.
                        </p>
                    </div>

                    <Link
                        to="/notes/create"
                        className="w-fit rounded-lg bg-slate-900 px-4 py-2 font-medium text-white dark:bg-slate-100 dark:text-slate-950"
                    >
                        Create Note
                    </Link>
                </div>

                <div className="mt-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-5">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchInput}
                        onChange={(event) =>
                            handleSearchChange(event.target.value)
                        }
                        className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-300 md:col-span-2"
                    />

                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(event) =>
                            updateParam("category", event.target.value)
                        }
                        className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-300"
                    />

                    <select
                        value={status}
                        onChange={(event) =>
                            updateParam("status", event.target.value)
                        }
                        className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-300"
                    >
                        <option value="">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(event) =>
                            updateParam("sortBy", event.target.value)
                        }
                        className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-300"
                    >
                        <option value="createdAt">Created Date</option>
                        <option value="updatedAt">Updated Date</option>
                        <option value="title">Title</option>
                        <option value="category">Category</option>
                        <option value="status">Status</option>
                        <option value="isPinned">Pinned</option>
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(event) =>
                            updateParam("sortOrder", event.target.value)
                        }
                        className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-300"
                    >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>

                {deleteMutation.isError && (
                    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {getErrorMessage(deleteMutation.error)}
                    </div>
                )}

                {notesQuery.isLoading && (
                    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        Loading notes...
                    </div>
                )}

                {notesQuery.isError && (
                    <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
                        {getErrorMessage(notesQuery.error)}
                    </div>
                )}

                {!notesQuery.isLoading &&
                    !notesQuery.isError &&
                    notes.length === 0 && (
                        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h2 className="text-xl font-semibold">
                                No notes found
                            </h2>
                            <p className="mt-2 text-slate-600 dark:text-slate-300">
                                Create your first note or change your filters.
                            </p>
                        </div>
                    )}

                {!notesQuery.isLoading &&
                    !notesQuery.isError &&
                    notes.length > 0 && (
                        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {notes.map((note) => (
                                <article
                                    key={note._id}
                                    className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                                {note.category}
                                            </p>

                                            <h2 className="mt-1 text-xl font-semibold">
                                                {note.isPinned ? "📌 " : ""}
                                                {note.title}
                                            </h2>
                                        </div>

                                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                            {note.status}
                                        </span>
                                    </div>

                                    <p className="mt-4 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                                        {note.content}
                                    </p>

                                    {note.tags.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {note.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        <Link
                                            to={`/notes/${note._id}`}
                                            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            to={`/notes/${note._id}/edit`}
                                            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(note._id)
                                            }
                                            disabled={deleteMutation.isPending}
                                            className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                {pagination && pagination.totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <button
                            type="button"
                            disabled={!pagination.hasPreviousPage}
                            onClick={() =>
                                updateParam("page", String(page - 1))
                            }
                            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
                        >
                            Previous
                        </button>

                        <span className="text-sm text-slate-600 dark:text-slate-300">
                            Page {pagination.currentPage} of{" "}
                            {pagination.totalPages}
                        </span>

                        <button
                            type="button"
                            disabled={!pagination.hasNextPage}
                            onClick={() =>
                                updateParam("page", String(page + 1))
                            }
                            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}

export default NotesListPage;
