import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { createNote } from "../api/notesApi";
import NoteForm from "../components/notes/NoteForm";
import type { NoteFormValues } from "../features/notes/noteSchemas";
import { getErrorMessage } from "../utils/getErrorMessage";
import { parseTags } from "../utils/parseTags";

function CreateNotePage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createNote,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            navigate(`/notes/${response.data.note._id}`);
        },
    });

    function handleSubmit(values: NoteFormValues) {
        createMutation.mutate({
            title: values.title,
            content: values.content,
            category: values.category,
            tags: parseTags(values.tagsText),
            status: values.status,
            isPinned: values.isPinned,
        });
    }

    return (
        <main className="px-4 py-10">
            <section className="mx-auto max-w-3xl">
                <div className="mb-6">
                    <Link
                        to="/notes"
                        className="text-sm font-medium text-slate-600 underline hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                        Back to notes
                    </Link>

                    <h1 className="mt-4 text-3xl font-bold">Create Note</h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                        Add a new note to your workspace.
                    </p>
                </div>

                {createMutation.isError && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {getErrorMessage(createMutation.error)}
                    </div>
                )}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <NoteForm
                        submitLabel="Create Note"
                        isSubmitting={createMutation.isPending}
                        onSubmit={handleSubmit}
                    />
                </div>
            </section>
        </main>
    );
}

export default CreateNotePage;
