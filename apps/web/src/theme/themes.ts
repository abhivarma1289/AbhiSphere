import { createTheme } from "@mui/material";
import type { Theme } from "@mui/material";
import type { PaletteMode } from "@mui/material";

export type ThemeName = "light" | "dark" | "ocean" | "emerald" | "plum";

const shape = { borderRadius: 14 };

function baseTheme(mode: PaletteMode) {
  return createTheme({
    palette: { mode },
    shape,
    typography: {
      fontFamily: [
        "Inter",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
      ].join(","),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: "none", borderRadius: shape.borderRadius },
        },
      },
      MuiPaper: { defaultProps: { elevation: 0 } },
    },
  });
}

/** Accent palettes for the fun themes */
const accents = {
  ocean: { primary: { main: "#1479FF" }, secondary: { main: "#00C2FF" } },
  emerald: { primary: { main: "#0FA36B" }, secondary: { main: "#4AD991" } },
  plum: { primary: { main: "#8E5AF7" }, secondary: { main: "#F78EF0" } },
};

export const buildTheme = (name: ThemeName): Theme => {
  switch (name) {
    case "light": {
      const t = baseTheme("light");
      return createTheme(t, {
        palette: {
          primary: { main: "#1976d2" },
          secondary: { main: "#9c27b0" },
          background: { default: t.palette.grey[50], paper: "#fff" },
        },
      });
    }
    case "dark": {
      const t = baseTheme("dark");
      return createTheme(t, {
        palette: {
          primary: { main: "#90caf9" },
          secondary: { main: "#ce93d8" },
          background: { default: "#0b0f19", paper: "#111827" },
        },
      });
    }
    case "ocean": {
      const t = baseTheme("light");
      return createTheme(t, {
        palette: {
          ...accents.ocean,
          background: { default: "#f6fbff", paper: "#ffffff" },
        },
      });
    }
    case "emerald": {
      const t = baseTheme("light");
      return createTheme(t, {
        palette: {
          ...accents.emerald,
          background: { default: "#f4fbf7", paper: "#ffffff" },
        },
      });
    }
    case "plum": {
      const t = baseTheme("light");
      return createTheme(t, {
        palette: {
          ...accents.plum,
          background: { default: "#fbf7ff", paper: "#ffffff" },
        },
      });
    }
  }
};
