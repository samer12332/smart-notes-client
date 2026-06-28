export function parseTags(tagsText?: string): string[] {
    if (!tagsText) {
        return [];
    }

    return tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
}
