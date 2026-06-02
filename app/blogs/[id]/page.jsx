"use client"

import React, { useEffect, useState } from "react";
import { assets } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@/lib/context/ThemeContext";
import ThemeToggle from "@/Components/ThemeToggle";
import { DetailSkeleton } from "@/Components/SkeletonLoader";

const Page = ({ params }) => {
    const { id } = React.use(params);
    const { theme } = useTheme();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBlogData = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/blog", {
                params: {
                    id: id
                }
            });
            setData(response.data);
            if (response.data && response.data.title) {
                document.title = `${response.data.title} - Blogger`;
            }
        } catch (error) {
            console.error("Error fetching blog:", error);
            toast.error("Failed to load blog post. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchBlogData();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-black dark:text-zinc-100 flex flex-col justify-between transition-colors">
                <div>
                    <div className="bg-gray-200 dark:bg-zinc-900 py-5 px-5 md:px-12 lg:px-28 border-b-2 border-black dark:border-zinc-800 transition-colors">
                        <div className="flex justify-between items-center">
                            <Link href="/">
                                <Image src={theme === "dark" ? assets.logo_light : assets.logo} width={180} alt="Logo" className="w-[130px] sm:w-auto" />
                            </Link>
                            <div className="flex items-center gap-4">
                                <ThemeToggle />
                                <Link href="/admin">
                                    <button className="cursor-pointer flex items-center gap-2 font-black py-1 px-3 sm:py-3 sm:px-6 border-2 border-black dark:border-white bg-white dark:bg-zinc-800 text-black dark:text-zinc-100 shadow-[-7px_7px_0px_#000000] dark:shadow-[-7px_7px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-none dark:hover:shadow-none transition-all duration-200 text-xs sm:text-sm">
                                        Dashboard
                                        <Image src={assets.arrow} alt="" className="dark:invert" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="text-center my-24">
                            <div className="h-10 bg-slate-300 dark:bg-zinc-800 w-3/4 mx-auto mb-4 animate-pulse"></div>
                            <div className="w-16 h-16 rounded-full bg-slate-300 dark:bg-zinc-800 mx-auto animate-pulse"></div>
                        </div>
                    </div>
                    <DetailSkeleton />
                </div>
                <Footer />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 transition-colors">
                <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-8 max-w-[450px] text-center shadow-[-6px_6px_0px_#000000] dark:shadow-[-6px_6px_0px_#ffffff]">
                    <h2 className="text-2xl font-black text-black dark:text-zinc-100 mb-4">Blog Post Not Found</h2>
                    <p className="text-slate-700 dark:text-zinc-300 font-medium mb-6">The article you are looking for does not exist or may have been deleted.</p>
                    <Link href="/">
                        <button className="cursor-pointer bg-black text-white hover:bg-white hover:text-black border-2 border-black dark:border-white px-6 py-2 font-extrabold text-sm transition-all shadow-[-4px_4px_0px_#000000] dark:shadow-[-4px_4px_0px_#ffffff] active:translate-x-[2px] active:translate-y-[-2px] active:shadow-none">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 dark:bg-zinc-950 text-black dark:text-zinc-100 min-h-screen transition-colors">
            <ToastContainer theme={theme === "dark" ? "dark" : "light"} />
            <div className="bg-gray-200 dark:bg-zinc-900 py-5 px-5 md:px-12 lg:px-28 border-b-2 border-black dark:border-zinc-800 transition-colors">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image src={theme === "dark" ? assets.logo_light : assets.logo} width={180} alt="Blogger Logo" className="w-[130px] sm:w-auto" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/admin">
                            <button className="cursor-pointer flex items-center gap-2 font-black py-1 px-3 sm:py-3 sm:px-6 border-2 border-black dark:border-white bg-white dark:bg-zinc-800 text-black dark:text-zinc-100 shadow-[-7px_7px_0px_#000000] dark:shadow-[-7px_7px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-none dark:hover:shadow-none transition-all duration-200 text-xs sm:text-sm">
                                Dashboard
                                <Image src={assets.arrow} alt="" className="dark:invert" />
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="text-center my-24">
                    <h1 className="text-2xl sm:text-5xl font-black max-w-[700px] mx-auto text-black dark:text-zinc-100">{data.title}</h1>
                    <div className="relative mx-auto mt-6 border-2 border-black dark:border-white rounded-full overflow-hidden w-[60px] h-[60px] shadow-[-3px_3px_0px_#000000] dark:shadow-[-3px_3px_0px_#ffffff]">
                        <Image src={data.authorImg} fill className="object-cover" alt={data.author} />
                    </div>
                    <p className="mt-2 pb-2 text-lg max-w-[740px] mx-auto">
                        <Link
                            href="/profile"
                            className="text-inherit font-black underline hover:no-underline hover:text-[#ffc400] transition-colors"
                        >
                            {data.author}
                        </Link>
                    </p>
                </div>
            </div>

            <div className="max-w-[800px] mx-auto mt-[-100px] mb-10 px-5 relative z-10">
                <div className="relative w-full aspect-video border-4 border-white dark:border-zinc-800 shadow-[-10px_10px_0px_#000000] dark:shadow-[-10px_10px_0px_#ffffff] overflow-hidden">
                    <Image src={data.image} fill className="object-cover" alt={data.title || "Blog Main Cover Image"} priority />
                </div>
                
                <div 
                    className="blog-content mt-12 text-slate-800 dark:text-zinc-200 text-base sm:text-lg font-medium leading-relaxed border-b-2 border-black dark:border-zinc-800 pb-12" 
                    dangerouslySetInnerHTML={{__html: data.description}}
                ></div>

                <div className="my-16">
                    <p className="text-black dark:text-zinc-100 font-extrabold text-lg mb-4">Share this article on social media</p>
                    <div className="flex gap-3">
                        <a 
                            href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ""}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Share on Facebook"
                            className="hover:scale-105 transition-transform inline-block"
                        >
                            <Image src={assets.facebook_icon} width={50} alt="Facebook" />
                        </a>
                        <a 
                            href={`https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ""}&text=${encodeURIComponent(data.title)}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Share on Twitter"
                            className="hover:scale-105 transition-transform inline-block"
                        >
                            <Image src={assets.twitter_icon} width={50} alt="Twitter" />
                        </a>
                        <a 
                            href={`https://plus.google.com/share?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ""}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Share on Google Plus"
                            className="hover:scale-105 transition-transform inline-block"
                        >
                            <Image src={assets.googleplus_icon} width={50} alt="Google Plus" />
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Page;