"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import { useTheme } from "@/lib/context/ThemeContext";
import ThemeToggle from "@/Components/ThemeToggle";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const { theme } = useTheme();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const response = await axios.post("/api/admin/login", { username, password });
            if (response.data.success) {
                toast.success(response.data.msg);
                router.push("/admin");
            }
        } catch (error) {
            console.error("Login failed:", error);
            const msg = error.response?.data?.msg || "Invalid username or password";
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 transition-colors relative">
            <div className="absolute top-6 right-6">
                <ThemeToggle />
            </div>
            
            <div className="mb-8">
                <Image 
                    src={theme === "dark" ? assets.logo_light : assets.logo} 
                    width={180} 
                    height={50} 
                    alt="Blogger Logo" 
                    className="w-[150px] sm:w-[180px] h-auto" 
                    priority
                />
            </div>
            
            <div className="w-full max-w-[450px] bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-8 shadow-[-8px_8px_0px_#000000] dark:shadow-[-8px_8px_0px_#ffffff] transition-all">
                <h2 className="text-2xl font-black text-black dark:text-zinc-100 mb-6 text-center border-b-2 border-black dark:border-zinc-800 pb-4 uppercase">
                    ADMIN LOGIN
                </h2>
                
                <form onSubmit={onSubmitHandler} className="space-y-6">
                    <div>
                        <label className="block text-sm font-extrabold text-black dark:text-zinc-100 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-black dark:border-white outline-none font-bold text-black dark:text-zinc-100 focus:shadow-[-4px_4px_0px_#000000] dark:focus:shadow-[-4px_4px_0px_#ffffff] transition-all bg-white dark:bg-zinc-800 placeholder-slate-500 dark:placeholder-zinc-400 rounded-none"
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-extrabold text-black dark:text-zinc-100 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-black dark:border-white outline-none font-bold text-black dark:text-zinc-100 focus:shadow-[-4px_4px_0px_#000000] dark:focus:shadow-[-4px_4px_0px_#ffffff] transition-all bg-white dark:bg-zinc-800 placeholder-slate-500 dark:placeholder-zinc-400 rounded-none"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-[#ffc400] dark:bg-zinc-800 text-black dark:text-zinc-100 font-black border-2 border-black dark:border-white shadow-[-5px_5px_0px_#000000] dark:shadow-[-5px_5px_0px_#ffffff] hover:bg-white dark:hover:bg-white dark:hover:text-black hover:text-black transition-all active:translate-x-[2px] active:translate-y-[-2px] active:shadow-none cursor-pointer text-center text-sm rounded-none disabled:opacity-50"
                    >
                        {submitting ? "LOGGING IN..." : "LOG IN"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
