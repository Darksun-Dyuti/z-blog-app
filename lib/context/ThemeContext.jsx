"use client"
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "system",
  resolvedTheme: "light",
  toggleTheme: () => {},
  setTheme: (theme) => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("system");
  const [resolvedTheme, setResolvedTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system")
      ? storedTheme
      : "system";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      let activeTheme = theme;
      if (theme === "system") {
        activeTheme = mediaQuery.matches ? "dark" : "light";
      }
      setResolvedTheme(activeTheme);

      if (activeTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme();

    if (theme === "system") {
      mediaQuery.addEventListener("change", applyTheme);
      return () => mediaQuery.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  const changeTheme = (newTheme) => {
    if (newTheme === "light" || newTheme === "dark" || newTheme === "system") {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  const toggleTheme = () => {
    const cycle = {
      light: "dark",
      dark: "system",
      system: "light"
    };
    const nextTheme = cycle[theme] || "light";
    changeTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, toggleTheme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

