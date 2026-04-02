import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#ef4444",   // red-500
            light: "#f87171",  // red-400
            dark: "#dc2626",   // red-600
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#f97316",   // orange-500
          },

     
          background: {
            default: mode === "dark" ? "#111827" : "#f3f4f6", 
            paper: mode === "dark" ? "#1f2937" : "#ffffff",   
          },

          // 🔥 Text colors
          text: {
            primary: mode === "dark" ? "#f9fafb" : "#111827",   // gray-50 / gray-900
            secondary: mode === "dark" ? "#d1d5db" : "#4b5563", // gray-300 / gray-600
          },
        },

        // Optional (تحسينات UI)
        shape: {
          borderRadius: 10,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ theme: mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

