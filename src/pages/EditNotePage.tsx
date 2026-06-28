import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getNoteById, updateNote } from "../api/notesApi";
import NoteForm from "../components/notes/NoteForm";
import type { NoteFormValues } from "../features/notes/noteSchemas";
import { getErrorMessage } from "../utils/getErrorMessage";
import { parseTags } from "../utils/parseTags";

function EditNotePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const noteQuery = useQuery({
        queryKey: ["note", id],
        queryFn: () => getNoteById(id as string),
        enabled: Boolean(id),
    });

    const updateMutation = useMutation({
        mutationFn: updateNote,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            queryClient.invalidateQueries({ queryKey: ["note", id] });

            navigate(`/notes/${response.data.note._id}`);
        },
    });

    function handleSubmit(values: NoteFormValues) {
        if (!id) {
            return;
        }

        updateMutation.mutate({
            id,
            data: {
                title: values.title,
                content: values.content,
                category: values.category,
                tags: parseTags(values.tagsText),
                status: values.status,
                isPinned: values.isPinned,
            },
        });
    }

    if (noteQuery.isLoading) {
        return (
            <main className="px-4 py-10">
                <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    Loading note...
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
                <div className="mb-6">
                    <Link
                        to={`/notes/${note._id}`}
                        className="text-sm font-medium text-slate-600 underline hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                        Back to note
                    </Link>

                    <h1 className="mt-4 text-3xl font-bold">Edit Note</h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Update your note details.
                    </p>
                </div>

                {updateMutation.isError && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {getErrorMessage(updateMutation.error)}
                    </div>
                )}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <NoteForm
                        submitLabel="Update Note"
                        isSubmitting={updateMutation.isPending}
                        defaultValues={{
                            title: note.title,
                            content: note.content,
                            category: note.category,
                            tagsText: note.tags.join(", "),
                            status: note.status,
                            isPinned: note.isPinned,
                        }}
                        onSubmit={handleSubmit}
                    />
                </div>
            </section>
        </main>
    );
}

export default EditNotePage;
