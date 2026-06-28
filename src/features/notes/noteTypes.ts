export type NoteStatus = "draft" | "active" | "archived";

export type Note = {
    _id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    status: NoteStatus;
    isPinned: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
};

export type NotesPagination = {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

export type NotesQueryParams = {
    search?: string;
    category?: string;
    status?: NoteStatus | "";
    sortBy?:
        | "createdAt"
        | "updatedAt"
        | "title"
        | "category"
        | "status"
        | "isPinned";
    sortOrder?: "asc" | "desc";
    page?: number;
    limit?: number;
};

export type NotesListResponse = {
    success: boolean;
    results: number;
    pagination: NotesPagination;
    data: {
        notes: Note[];
    };
};

export type NoteResponse = {
    success: boolean;
    message?: string;
    data: {
        note: Note;
    };
};

export type DeleteNoteResponse = {
    success: boolean;
    message: string;
};
