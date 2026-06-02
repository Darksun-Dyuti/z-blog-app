"use client"

import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/lib/context/ThemeContext";
import ThemeToggle from "@/Components/ThemeToggle";

export default function Layout({ children }) {
    const [profileImg, setProfileImg] = useState("");
    const [loadingImg, setLoadingImg] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const { theme } = useTheme();

    const isLoginPage = pathname === "/admin/login";

    const fetchProfileImg = async () => {
        try {
            setLoadingImg(true);
            const response = await axios.get("/api/profile");
            setProfileImg(response.data.image || "");
        } catch (error) {
            console.error("Error fetching admin profile image:", error);
        } finally {
            setLoadingImg(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/admin/logout");
            if (response.data.success) {
                toast.success("Logged out successfully");
                router.push("/admin/login");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to logout");
        }
    };

    useEffect(() => {
        if (!isLoginPage) {
            fetchProfileImg();
        }
    }, [isLoginPage]);

    if (isLoginPage) {
        return (
            <div className="bg-slate-50 dark:bg-zinc-950 text-black dark:text-zinc-100 min-h-screen transition-colors">
                <ToastContainer theme={theme === "dark" ? "dark" : "light"} />
                {children}
            </div>
        )
    }

    return (
        <div className="flex bg-slate-50 dark:bg-zinc-950 text-black dark:text-zinc-100 min-h-screen transition-colors">
            <ToastContainer theme={theme === "dark" ? "dark" : "light"} />
            <Sidebar />
            
            <div className="flex flex-col w-full min-h-screen overflow-y-auto">
                <div className="flex items-center justify-between w-full py-3 h-[60px] px-6 sm:px-12 border-b-2 border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors">
                    <h3 className="font-extrabold text-sm sm:text-lg text-black dark:text-zinc-100">Admin Panel</h3>
                    
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button 
                            onClick={handleLogout}
                            className="cursor-pointer bg-black text-white hover:bg-white hover:text-black border-2 border-black dark:bg-zinc-800 dark:text-zinc-100 dark:border-white dark:hover:bg-white dark:hover:text-black px-3 py-1.5 font-extrabold text-xs sm:text-sm transition-colors shadow-[-2px_2px_0px_#000000] dark:shadow-[-2px_2px_0px_#ffffff] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none rounded-none"
                        >
                            LOGOUT
                        </button>
                        
                        {loadingImg ? (
                            <div className="w-[36px] h-[36px] rounded-full border-2 border-black dark:border-white bg-slate-200 dark:bg-zinc-800 animate-pulse"></div>
                        ) : (
                            <div className="relative w-[36px] h-[36px] rounded-full border-2 border-black dark:border-white overflow-hidden bg-slate-200">
                                <Image 
                                    src={profileImg ? profileImg : assets.profile_icon} 
                                    fill 
                                    alt="Admin Profile Avatar" 
                                    className="object-cover" 
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    )
}