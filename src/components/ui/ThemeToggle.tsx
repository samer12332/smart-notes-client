import { useEffect, useState } from "react";

import { applyTheme, getStoredTheme, type Theme } from "../../utils/theme";

function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(() => getStoredTheme());

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    function handleToggleTheme() {
        setTheme((currentTheme) => {
            return currentTheme === "dark" ? "light" : "dark";
        });
    }

    return (
        <button
            type="button"
            onClick={handleToggleTheme}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
    );
}

export default ThemeToggle;
