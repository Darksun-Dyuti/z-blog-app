"use client"

import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@/lib/context/ThemeContext";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-black dark:bg-zinc-950 dark:text-zinc-100 transition-colors">
      <div>
        <ToastContainer theme={theme === "dark" ? "dark" : "light"} />
        <Header />
        <BlogList />
      </div>
      <Footer />
    </div>
  );
}