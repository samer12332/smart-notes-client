export type Theme = "light" | "dark";

const THEME_KEY = "theme";

export function getStoredTheme(): Theme {
    const storedTheme = localStorage.getItem(THEME_KEY);

    if (storedTheme === "dark" || storedTheme === "light") {
        return storedTheme;
    }

    return "light";
}

export function applyTheme(theme: Theme) {
    const root = document.documentElement;

    if (theme === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }

    localStorage.setItem(THEME_KEY, theme);
}
