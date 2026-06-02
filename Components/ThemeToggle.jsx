"use client"
import React from "react";
import { useTheme } from "@/lib/context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="cursor-pointer flex items-center justify-center w-10 h-10 border-2 border-black bg-[#ffc400] text-black shadow-[-3px_3px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[-1px] hover:shadow-[-2px_2px_0px_#000000] active:translate-x-[2px] active:translate-y-[-2px] active:shadow-none transition-all duration-100 dark:bg-zinc-800 dark:text-[#ffc400] dark:shadow-[-3px_3px_0px_#ffffff] dark:hover:shadow-[-2px_2px_0px_#ffffff] dark:active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white rounded-none"
    >
      <div className="transition-transform duration-300 rotate-0 dark:rotate-[360deg]">
        {theme === "light" ? (
          <FiMoon className="w-5 h-5" />
        ) : (
          <FiSun className="w-5 h-5" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
