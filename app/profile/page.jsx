"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import BlogItem from "@/Components/BlogItem";

const PublicProfile = () => {
    const [profile, setProfile] = useState(null);
    const [blogs, setBlogs] = useState([]);

    const fetchData = async () => {
        try {
            const profileResponse = await axios.get("/api/profile");
            setProfile(profileResponse.data);

            const blogsResponse = await axios.get("/api/blog");
            const allBlogs = blogsResponse.data.blogs || [];
            
            const authorName = profileResponse.data.name;
            const filteredBlogs = allBlogs.filter(
                (blog) => blog.author.toLowerCase() === authorName.toLowerCase()
            );
            setBlogs(filteredBlogs);
        } catch (error) {
            console.error("Error fetching public profile data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
            <div>
                <div className="py-5 px-5 md:px-12 lg:px-28 bg-white border-b-2 border-black">
                    <div className="flex justify-between items-center">
                        <Link href="/">
                            <Image src={assets.logo} width={180} height={50} alt="Logo" className="w-[130px] sm:w-auto h-auto" />
                        </Link>
                        <Link href="/admin">
                            <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] cursor-pointer active:translate-x-[2px] active:translate-y-[-2px] active:shadow-none bg-white">
                                Dashboard
                                <Image src={assets.arrow} alt="" />
                            </button>
                        </Link>
                    </div>
                </div>

                {profile && (
                    <div className="max-w-[800px] mx-auto mt-12 px-5">
                        <div className="bg-white border-2 border-black p-8 sm:p-12 shadow-[-8px_8px_0px_#000000] flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-black shadow-[-4px_4px_0px_#000000] flex-shrink-0">
                                <img
                                    src={profile.image}
                                    alt={profile.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl sm:text-5xl font-black text-black mb-3">
                                    {profile.name}
                                </h1>
                                <p className="text-[#ffc400] text-sm sm:text-base font-black uppercase tracking-widest mb-4 bg-black px-3 py-1 inline-block">
                                    Author & Publisher
                                </p>
                                <p className="text-slate-800 text-sm sm:text-lg mb-6 leading-relaxed font-medium">
                                    {profile.bio}
                                </p>
                                <div className="flex justify-center md:justify-start gap-4">
                                    {profile.linkedin && (
                                        <a
                                            href={profile.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-white hover:bg-[#ffc400] transition-all font-extrabold shadow-[-3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[-1px] active:shadow-none"
                                        >
                                            <span>LinkedIn</span>
                                        </a>
                                    )}
                                    {profile.github && (
                                        <a
                                            href={profile.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-white hover:bg-[#ffc400] transition-all font-extrabold shadow-[-3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[-1px] active:shadow-none"
                                        >
                                            <span>GitHub</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-[1000px] mx-auto mt-16 px-5 mb-24">
                    <h2 className="text-2xl sm:text-3xl font-black text-black mb-8 border-b-2 border-black pb-4 text-center md:text-left">
                        Publications ({blogs.length})
                    </h2>
                    {blogs.length > 0 ? (
                        <div className="flex flex-wrap justify-around md:justify-start gap-6 gap-y-10">
                            {blogs.map((item, index) => (
                                <BlogItem
                                    key={index}
                                    id={item._id}
                                    image={item.image}
                                    title={item.title}
                                    description={item.description}
                                    category={item.category}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white border-2 border-black border-dashed">
                            <p className="text-slate-500 font-bold text-lg">This author hasn't published any blogs yet.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PublicProfile;
