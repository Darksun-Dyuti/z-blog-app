"use client"

import BlogItem from "./BlogItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CardSkeleton } from "./SkeletonLoader";

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/blog");
            setBlogs(response.data.blogs || []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            toast.error("Failed to load blog posts. Please check your database connection.");
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    },[])

    const getBtnClass = (categoryName) => {
        const baseClass = "cursor-pointer font-extrabold px-4 py-1.5 border-2 border-black dark:border-white transition-all text-sm sm:text-base ";
        const activeClass = "bg-black text-white dark:bg-zinc-100 dark:text-black shadow-none";
        const inactiveClass = "bg-white text-black dark:bg-zinc-800 dark:text-zinc-100 shadow-[-3px_3px_0px_#000000] dark:shadow-[-3px_3px_0px_#ffffff] hover:translate-x-[1px] hover:translate-y-[-1px] hover:shadow-[-2px_2px_0px_#000000] dark:hover:shadow-[-2px_2px_0px_#ffffff] active:translate-x-0 active:translate-y-0 active:shadow-none";
        
        return baseClass + (menu === categoryName ? activeClass : inactiveClass);
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-center gap-4 my-10 px-4">
                <button onClick={() => setMenu("All")} className={getBtnClass("All")}>All</button>
                <button onClick={() => setMenu("Technology")} className={getBtnClass("Technology")}>Technology</button>
                <button onClick={() => setMenu("Startup")} className={getBtnClass("Startup")}>Startup</button>
                <button onClick={() => setMenu("Lifestyle")} className={getBtnClass("Lifestyle")}>Lifestyle</button>
            </div>
            
            <div className="flex flex-wrap justify-center sm:justify-around gap-6 gap-y-12 mb-16 xl:mx-24 px-4">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
                ) : blogs.filter((item) => menu === "All" ? true : item.category === menu).length > 0 ? (
                    blogs.filter((item) => menu === "All" ? true : item.category === menu).map((item) => {
                        return (
                            <BlogItem 
                                key={item._id} 
                                id={item._id} 
                                image={item.image} 
                                title={item.title} 
                                description={item.description} 
                                category={item.category} 
                            />
                        );
                    })
                ) : (
                    <div className="text-center py-16 w-full border-2 border-black dark:border-zinc-800 border-dashed bg-white dark:bg-zinc-900 shadow-[-6px_6px_0px_#000000] dark:shadow-[-6px_6px_0px_#ffffff] max-w-[600px] mx-auto p-8">
                        <p className="text-slate-600 dark:text-zinc-400 font-extrabold text-lg">No blogs published under this category yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogList;