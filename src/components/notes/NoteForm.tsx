import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    noteSchema,
    type NoteFormValues,
} from "../../features/notes/noteSchemas";

type NoteFormProps = {
    defaultValues?: Partial<NoteFormValues>;
    isSubmitting?: boolean;
    submitLabel: string;
    onSubmit: (values: NoteFormValues) => void;
};

function NoteForm({
    defaultValues,
    isSubmitting = false,
    submitLabel,
    onSubmit,
}: NoteFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NoteFormValues>({
        resolver: zodResolver(noteSchema),
        defaultValues: {
            title: "",
            content: "",
            category: "General",
            tagsText: "",
            status: "active",
            isPinned: false,
            ...defaultValues,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label htmlFor="title" className="text-sm font-medium">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-300"
                    {...register("title")}
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="content" className="text-sm font-medium">
                    Content
                </label>
                <textarea
                    id="content"
                    rows={8}
                    className="mt-1 w-full resize-y rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-300"
                    {...register("content")}
                />
                {errors.content && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.content.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="category" className="text-sm font-medium">
                    Category
                </label>
                <input
                    id="category"
                    type="text"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-300"
                    {...register("category")}
                />
                {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.category.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="tagsText" className="text-sm font-medium">
                    Tags
                </label>
                <input
                    id="tagsText"
                    type="text"
                    placeholder="react, node, mongodb"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-300"
                    {...register("tagsText")}
                />
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Separate tags with commas.
                </p>
            </div>

            <div>
                <label htmlFor="status" className="text-sm font-medium">
                    Status
                </label>
                <select
                    id="status"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-300"
                    {...register("status")}
                >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                </select>
                {errors.status && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.status.message}
                    </p>
                )}
            </div>

            <label className="flex items-center gap-2 text-sm font-medium">
                <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300"
                    {...register("isPinned")}
                />
                Pin this note
            </label>

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-950"
            >
                {isSubmitting ? "Saving..." : submitLabel}
            </button>
        </form>
    );
}

export default NoteForm;
