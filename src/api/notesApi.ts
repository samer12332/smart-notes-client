import { axiosInstance } from "./axiosInstance";
import type {
    DeleteNoteResponse,
    NoteResponse,
    NotesListResponse,
    NotesQueryParams,
    NoteStatus,
} from "../features/notes/noteTypes";

export type NotePayload = {
    title: string;
    content: string;
    category: string;
    tags: string[];
    status: NoteStatus;
    isPinned: boolean;
};

function cleanParams(params: NotesQueryParams) {
    return Object.fromEntries(
        Object.entries(params).filter(([, value]) => {
            return value !== undefined && value !== "";
        }),
    );
}

export async function getNotes(
    params: NotesQueryParams = {},
): Promise<NotesListResponse> {
    const response = await axiosInstance.get<NotesListResponse>("/notes", {
        params: cleanParams(params),
    });

    return response.data;
}

export async function getNoteById(id: string): Promise<NoteResponse> {
    const response = await axiosInstance.get<NoteResponse>(`/notes/${id}`);

    return response.data;
}

export async function createNote(data: NotePayload): Promise<NoteResponse> {
    const response = await axiosInstance.post<NoteResponse>("/notes", data);

    return response.data;
}

export async function updateNote({
    id,
    data,
}: {
    id: string;
    data: Partial<NotePayload>;
}): Promise<NoteResponse> {
    const response = await axiosInstance.patch<NoteResponse>(
        `/notes/${id}`,
        data,
    );

    return response.data;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
    const response = await axiosInstance.delete<DeleteNoteResponse>(
        `/notes/${id}`,
    );

    return response.data;
}
