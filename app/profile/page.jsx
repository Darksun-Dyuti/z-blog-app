"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import BlogItem from "@/Components/BlogItem";
import { useTheme } from "@/lib/context/ThemeContext";
import ThemeToggle from "@/Components/ThemeToggle";
import { CardSkeleton } from "@/Components/SkeletonLoader";

const PublicProfile = () => {
    const { theme } = useTheme();
    const [profile, setProfile] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const profileResponse = await axios.get("/api/profile");
            setProfile(profileResponse.data);
            if (profileResponse.data && profileResponse.data.name) {
                document.title = `${profileResponse.data.name} - Author Profile`;
            }

            const blogsResponse = await axios.get("/api/blog");
            const allBlogs = blogsResponse.data.blogs || [];
            
            const authorName = profileResponse.data.name;
            const filteredBlogs = allBlogs.filter(
                (blog) => blog.author.toLowerCase() === authorName.toLowerCase()
            );
            setBlogs(filteredBlogs);
        } catch (error) {
            console.error("Error fetching public profile data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-black dark:text-zinc-100 flex flex-col justify-between transition-colors">
            <div>
                <div className="py-5 px-5 md:px-12 lg:px-28 bg-white dark:bg-zinc-900 border-b-2 border-black dark:border-zinc-800 transition-colors">
                    <div className="flex justify-between items-center">
                        <Link href="/">
                            <Image src={theme === "dark" ? assets.logo_light : assets.logo} width={180} height={50} alt="Logo" className="w-[130px] sm:w-auto h-auto" />
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
                </div>

                {loading ? (
                    <div className="max-w-[800px] mx-auto mt-12 px-5 animate-pulse">
                        <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 p-8 sm:p-12 shadow-[-8px_8px_0px_#000000] dark:shadow-[-8px_8px_0px_#ffffff] flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-slate-200 dark:bg-zinc-800 border-4 border-black dark:border-zinc-800 shadow-[-4px_4px_0px_#000000]"></div>
                            <div className="flex-1 space-y-4">
                                <div className="h-10 bg-slate-200 dark:bg-zinc-800 w-1/2"></div>
                                <div className="h-6 bg-slate-200 dark:bg-zinc-800 w-1/3"></div>
                                <div className="h-12 bg-slate-200 dark:bg-zinc-800 w-5/6"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    profile && (
                        <div className="max-w-[800px] mx-auto mt-12 px-5">
                            <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-8 sm:p-12 shadow-[-8px_8px_0px_#000000] dark:shadow-[-8px_8px_0px_#ffffff] flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all">
                                <div className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-black dark:border-white shadow-[-4px_4px_0px_#000000] dark:shadow-[-4px_4px_0px_#ffffff] flex-shrink-0">
                                    <Image
                                        src={profile.image}
                                        alt={profile.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h1 className="text-3xl sm:text-5xl font-black text-black dark:text-zinc-100 mb-3">
                                        {profile.name}
                                    </h1>
                                    <p className="text-black dark:text-[#ffc400] text-xs sm:text-sm font-black uppercase tracking-widest mb-4 bg-[#ffc400] dark:bg-zinc-850 px-3 py-1.5 inline-block border border-black dark:border-white">
                                        Author & Publisher
                                    </p>
                                    <p className="text-slate-800 dark:text-zinc-300 text-sm sm:text-lg mb-6 leading-relaxed font-medium">
                                        {profile.bio}
                                    </p>
                                    <div className="flex justify-center md:justify-start gap-4">
                                        {profile.linkedin && (
                                            <a
                                                href={profile.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-zinc-800 text-black dark:text-zinc-100 hover:bg-[#ffc400] dark:hover:bg-[#ffc400] dark:hover:text-black transition-all font-extrabold shadow-[-3px_3px_0px_#000000] dark:shadow-[-3px_3px_0px_#ffffff] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                                            >
                                                <span>LinkedIn</span>
                                            </a>
                                        )}
                                        {profile.github && (
                                            <a
                                                href={profile.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-zinc-800 text-black dark:text-zinc-100 hover:bg-[#ffc400] dark:hover:bg-[#ffc400] dark:hover:text-black transition-all font-extrabold shadow-[-3px_3px_0px_#000000] dark:shadow-[-3px_3px_0px_#ffffff] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                                            >
                                                <span>GitHub</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}

                <div className="max-w-[1000px] mx-auto mt-16 px-5 mb-24">
                    <h2 className="text-2xl sm:text-3xl font-black text-black dark:text-zinc-100 mb-8 border-b-2 border-black dark:border-zinc-800 pb-4 text-center md:text-left">
                        Publications ({loading ? "..." : blogs.length})
                    </h2>
                    {loading ? (
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 gap-y-10">
                            {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
                        </div>
                    ) : blogs.length > 0 ? (
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 gap-y-10">
                            {blogs.map((item) => (
                                <BlogItem
                                    key={item._id}
                                    id={item._id}
                                    image={item.image}
                                    title={item.title}
                                    description={item.description}
                                    category={item.category}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 border-dashed max-w-[600px] mx-auto">
                            <p className="text-slate-500 dark:text-zinc-400 font-extrabold text-lg">This author hasn't published any blogs yet.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PublicProfile;
