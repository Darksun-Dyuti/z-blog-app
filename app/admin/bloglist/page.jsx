"use client"

import BlogTableItem from "@/Components/AdminComponents/BlogTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {


    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blog');
            setBlogs(response.data.blogs || []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            toast.error("Failed to fetch blogs list");
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
        <div className="bg-slate-50 min-h-screen p-6 sm:p-10 border-t-2 border-black w-full">
            <h1 className="text-3xl font-black text-black mb-6">Manage Blogs</h1>
            <div className="relative max-w-[850px] overflow-x-auto border-2 border-black bg-white shadow-[-8px_8px_0px_#000000] scrollbar-hide">
                <table className="w-full text-sm text-black border-collapse">
                    <thead className="text-xs text-left text-white uppercase bg-black border-b-2 border-black">
                        <tr>
                            <th scope="col" className="hidden sm:table-cell px-6 py-4 font-black">Author</th>
                            <th scope="col" className="px-6 py-4 font-black">Blog Title</th>
                            <th scope="col" className="px-6 py-4 font-black">Date</th>
                            <th scope="col" className="px-6 py-4 font-black">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-black">
                        {blogs.map((item, index) => {
                            return <BlogTableItem key={index} mongoId={item._id} title={item.title} author={item.author} authorImg={item.authorImg} date={item.date} deleteBlog={deleteBlog} />
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default page;