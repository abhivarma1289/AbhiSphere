import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import { buildTheme } from "./themes";
import type { ThemeName } from "./themes";

type ThemeContextType = {
    themeName: ThemeName;
    setThemeName: (t: ThemeName) => void;
    cycleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const STORAGE_KEY = "abhisphere.theme";
const ALL_THEMES: ThemeName[] = ["light", "dark", "ocean", "emerald", "plum"];

function getSystemPref(): ThemeName {
    const dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return dark ? "dark" : "light";
}

export function AppThemeProvider({ children }: PropsWithChildren) {
    const [themeName, setThemeName] = useState<ThemeName>(() => {
        const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
        return saved && (ALL_THEMES as string[]).includes(saved) ? saved : getSystemPref();
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, themeName);
        // sync <meta name="theme-color"> for nicer mobile chrome coloring
        const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
        if (meta) {
            // quick pick based on mode
            meta.content = themeName === "dark" ? "#0b0f19" : "#ffffff";
        }
    }, [themeName]);

    const theme = useMemo(() => buildTheme(themeName), [themeName]);

    function cycleTheme() {
        const i = ALL_THEMES.indexOf(themeName);
        const next = ALL_THEMES[(i + 1) % ALL_THEMES.length];
        setThemeName(next);
    }

    const value = useMemo(() => ({ themeName, setThemeName, cycleTheme }), [themeName]);

    return (
        <ThemeContext.Provider value={value}>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
}

export function useAppTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useAppTheme must be used inside <AppThemeProvider>");
    return ctx;
}
