"use client";
import Cookie from "js-cookie";
import { createContext, useEffect, useMemo, useState } from "react";
export const ThemeContext = createContext();

function ThemeProvider({ initialTheme, children }) {
  const [theme, setTheme] = useState(initialTheme);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  }

  // change theme on OS theme change
  useEffect(() => {
    function handleOSThemeToggle(event) {
      setTheme(event.matches ? "dark" : "light");
    }

    const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    themeQuery.addEventListener("change", handleOSThemeToggle);

    return () => themeQuery.removeEventListener("change", handleOSThemeToggle);
  }, []);

  // persist theme on theme change
  useEffect(() => {
    Cookie.set("color-scheme", theme, {
      expires: 1000,
    });
    document.documentElement.setAttribute("data-color-scheme", theme);
  }, [theme]);

  // memoize so if provider re renders, pure components consuming don't get re rendered
  // due to recreation of brand new value object
  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
