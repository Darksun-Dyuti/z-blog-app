"use client"
import { assets } from "@/Assets/assets";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { useTheme } from "@/lib/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
    const { theme } = useTheme();
    const [email, setEmail] = useState("");

    const onSubmitHander = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Email cannot be empty");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("email", email);
            const response = await axios.post('/api/email', formData);

            if (response.data.success) {
                toast.success(response.data.msg);
                setEmail("");
            } else {
                toast.error(response.data.msg || "Error");
            }
        } catch (error) {
            console.error("Subscription error:", error);
            const errMsg = error.response?.data?.msg || "Failed to subscribe. Please try again.";
            toast.error(errMsg);
        }
    }

    return (
        <div className="py-5 px-5 md:px-12 lg:px-28">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <Image 
                        src={theme === "dark" ? assets.logo_light : assets.logo} 
                        width={180} 
                        alt="Blogger Logo" 
                        className="w-[130px] sm:w-auto" 
                        priority 
                    />
                </Link>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link href="/admin">
                        <button className="flex items-center gap-2 font-black py-1 px-3 sm:py-3 sm:px-6 border-2 border-black dark:border-white bg-white dark:bg-zinc-800 text-black dark:text-zinc-100 shadow-[-7px_7px_0px_#000000] dark:shadow-[-7px_7px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-8px_8px_0px_#000000] dark:hover:shadow-[-8px_8px_0px_#ffffff] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-200 cursor-pointer text-sm sm:text-base">
                            Dashboard
                            <Image src={assets.arrow} alt="" className="dark:invert" />
                        </button>
                    </Link>
                </div>
            </div>
            <div className="text-center my-8">
                <h1 className="text-3xl sm:text-5xl font-black text-black dark:text-zinc-100">Latest Blogs</h1>
                <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base text-slate-800 dark:text-zinc-300 font-medium leading-relaxed">
                    Explore high-quality insights, stories, and engineering guides. Subscribe to our newsletter to receive the latest updates directly in your inbox.
                </p>

                <form
                    onSubmit={onSubmitHander}
                    className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border-2 border-black dark:border-white bg-white dark:bg-zinc-900 shadow-[-7px_7px_0px_#000000] dark:shadow-[-7px_7px_0px_#ffffff] transition-all"
                >
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Enter your email"
                        className="pl-4 outline-none w-full bg-transparent text-black dark:text-zinc-100 font-medium placeholder-slate-500 dark:placeholder-zinc-500"
                        aria-label="Email subscription input"
                        required
                    />
                    <button
                        type="submit"
                        className="border-l-2 border-black dark:border-white py-4 px-4 sm:px-8 font-black text-black dark:text-zinc-100 bg-[#ffc400] dark:bg-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:bg-gray-800 transition-colors cursor-pointer text-sm sm:text-base rounded-none"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Header;