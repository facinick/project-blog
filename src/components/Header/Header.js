"use client";
import clsx from "clsx";
import { Moon, Rss, Sun } from "react-feather";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
import styles from "./Header.module.css";

function Header({ className, ...delegated }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button
          title={theme === "light" ? "Enable Dark Mode" : "Enable Light Mode"}
          className={styles.action}
          onClick={toggleTheme}
        >
          {theme === "light" && <Moon size="1.5rem" />}
          {theme === "dark" && <Sun size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
