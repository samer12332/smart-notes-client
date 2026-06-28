import { z } from "zod";

export const noteSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Title must be at least 2 characters")
        .max(120, "Title must not exceed 120 characters"),

    content: z
        .string()
        .trim()
        .min(2, "Content must be at least 2 characters")
        .max(10000, "Content must not exceed 10000 characters"),

    category: z
        .string()
        .trim()
        .min(2, "Category must be at least 2 characters")
        .max(60, "Category must not exceed 60 characters"),

    tagsText: z.string().optional(),

    status: z.enum(["draft", "active", "archived"]),

    isPinned: z.boolean(),
});

export type NoteFormValues = z.infer<typeof noteSchema>;
