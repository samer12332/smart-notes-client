import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import "./index.css";
import { store } from "./app/store";
import { queryClient } from "./app/queryClient";
import { applyTheme, getStoredTheme } from "./utils/theme";

applyTheme(getStoredTheme());

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Provider>
    </StrictMode>,
);
