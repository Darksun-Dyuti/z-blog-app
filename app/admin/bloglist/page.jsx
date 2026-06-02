"use client"

import BlogTableItem from "@/Components/AdminComponents/BlogTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TableRowSkeleton } from "@/Components/SkeletonLoader";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/blog');
            setBlogs(response.data.blogs || []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            toast.error("Failed to fetch blogs list");
        } finally {
            setLoading(false);
        }
    }

    const deleteBlog = async (mongoId)=>{
        try {
            const response = await axios.delete('/api/blog', {
                params: {
                    id: mongoId 
                }
            })
            toast.success(response.data.msg || "Blog deleted successfully");
            fetchBlogs();
        } catch (error) {
            console.error("Error deleting blog:", error);
            const errMsg = error.response?.data?.msg || "Failed to delete blog";
            toast.error(errMsg);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <div className="bg-slate-50 dark:bg-zinc-950 min-h-screen p-6 sm:p-10 border-t-2 border-black dark:border-zinc-800 w-full transition-colors">
            <h1 className="text-3xl font-black text-black dark:text-zinc-100 mb-6">Manage Blogs</h1>
            <div className="relative max-w-[850px] overflow-x-auto border-2 border-black dark:border-white bg-white dark:bg-zinc-900 shadow-[-8px_8px_0px_#000000] dark:shadow-[-8px_8px_0px_#ffffff] scrollbar-hide transition-all">
                <table className="w-full text-sm text-black dark:text-zinc-100 border-collapse">
                    <thead className="text-xs text-left text-white dark:text-black uppercase bg-black dark:bg-white border-b-2 border-black dark:border-white">
                        <tr>
                            <th scope="col" className="hidden sm:table-cell px-6 py-4 font-black">Author</th>
                            <th scope="col" className="px-6 py-4 font-black">Blog Title</th>
                            <th scope="col" className="px-6 py-4 font-black">Date</th>
                            <th scope="col" className="px-6 py-4 font-black">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black dark:divide-zinc-800">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={4} />)
                        ) : blogs.length > 0 ? (
                            blogs.map((item, index) => {
                                return (
                                    <BlogTableItem 
                                        key={item._id} 
                                        mongoId={item._id} 
                                        title={item.title} 
                                        author={item.author} 
                                        authorImg={item.authorImg} 
                                        date={item.date} 
                                        deleteBlog={deleteBlog} 
                                    />
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-10 font-bold text-slate-500">
                                    No blogs published yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BlogList;