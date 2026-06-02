"use client"

import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
    const [image, setImage] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Dyutimoy Bhunia",
        authorImg: "/author_img.png"
    })

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("/api/profile");
                if (response.data) {
                    setData((prev) => ({
                        ...prev,
                        author: response.data.name || "Dyutimoy Bhunia",
                        authorImg: response.data.image || "/author_img.png"
                    }));
                }
            } catch (error) {
                console.error("Error loading profile for blog creation:", error);
            }
        };
        fetchProfile();
    }, []);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        if (!image) {
            toast.error("Please upload a thumbnail image");
            return;
        }

        try {
            setSubmitting(true);
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('author', data.author);
            formData.append('authorImg', data.authorImg);
            formData.append('image', image);

            const response = await axios.post('/api/blog', formData);
            if (response.data.success) {
                toast.success(response.data.msg)
                setImage(false)
                setData({
                    title: "",
                    description: "",
                    category: "Startup",
                    author: data.author,
                    authorImg: data.authorImg
                })
            }
            else {
                toast.error(response.data.msg || "Error adding blog");
            }
        } catch (error) {
            console.error("Add blog error:", error);
            const errMsg = error.response?.data?.msg || "Failed to add blog. Please try again.";
            toast.error(errMsg);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="bg-slate-50 dark:bg-zinc-950 min-h-screen p-6 sm:p-10 border-t-2 border-black dark:border-zinc-800 w-full transition-colors">
            <div className="max-w-[650px] bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-6 sm:p-10 shadow-[-8px_8px_0px_#000000] dark:shadow-[-8px_8px_0px_#ffffff] transition-all">
                <h2 className="text-2xl font-black text-black dark:text-zinc-100 mb-8 border-b-2 border-black dark:border-zinc-800 pb-4">Add New Blog Post</h2>
                <form onSubmit={onSubmitHandler}>
                    <p className="text-base font-extrabold text-black dark:text-zinc-100">Upload Thumbnail</p>

                    <label htmlFor="image" className="inline-block mt-3">
                        <div className="cursor-pointer border-2 border-dashed border-black dark:border-white bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 flex items-center justify-center p-3 transition-colors w-[150px] h-[80px] shadow-[-3px_3px_0px_#000000] dark:shadow-[-3px_3px_0px_#ffffff] active:translate-x-[1px] active:translate-y-[-1px] active:shadow-none">
                            <Image alt='img' src={!image ? assets.upload_area : URL.createObjectURL(image)} width={130} height={60} className="object-contain max-h-[60px] dark:invert" style={{ filter: image ? "none" : "" }} />
                        </div>
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />

                    <p className="text-base font-extrabold text-black dark:text-zinc-100 mt-6">Blog Title</p>
                    <input 
                        name="title" 
                        onChange={onChangeHandler} 
                        value={data.title} 
                        className="w-full mt-2 px-4 py-3 border-2 border-black dark:border-white outline-none font-bold text-black dark:text-zinc-100 focus:shadow-[-4px_4px_0px_#000000] dark:focus:shadow-[-4px_4px_0px_#ffffff] transition-all bg-white dark:bg-zinc-800 placeholder-slate-500 dark:placeholder-zinc-400 rounded-none" 
                        type="text" 
                        placeholder="Type title here" 
                        required 
                    />

                    <p className="text-base font-extrabold text-black dark:text-zinc-100 mt-6">Blog Description</p>
                    <textarea 
                        name="description" 
                        onChange={onChangeHandler} 
                        value={data.description} 
                        className="w-full mt-2 px-4 py-3 border-2 border-black dark:border-white outline-none font-semibold text-black dark:text-zinc-100 focus:shadow-[-4px_4px_0px_#000000] dark:focus:shadow-[-4px_4px_0px_#ffffff] transition-all bg-white dark:bg-zinc-800 resize-y placeholder-slate-500 dark:placeholder-zinc-400 rounded-none" 
                        placeholder="Write content here (HTML supported)" 
                        rows={6} 
                        required 
                    />

                    <p className="text-base font-extrabold text-black dark:text-zinc-100 mt-6">Blog Category</p>
                    <select 
                        name="category" 
                        onChange={onChangeHandler} 
                        value={data.category} 
                        className="w-44 mt-2 px-4 py-3 border-2 border-black dark:border-white outline-none font-black text-black dark:text-zinc-100 bg-white dark:bg-zinc-800 focus:shadow-[-4px_4px_0px_#000000] dark:focus:shadow-[-4px_4px_0px_#ffffff] transition-all cursor-pointer rounded-none"
                    >
                        <option value="Startup" className="bg-white dark:bg-zinc-800 text-black dark:text-zinc-100">Startup</option>
                        <option value="Technology" className="bg-white dark:bg-zinc-800 text-black dark:text-zinc-100">Technology</option>
                        <option value="Lifestyle" className="bg-white dark:bg-zinc-800 text-black dark:text-zinc-100">Lifestyle</option>
                    </select>

                    <br />
                    <button 
                        type="submit" 
                        disabled={submitting}
                        className="mt-8 w-44 h-12 bg-black dark:bg-zinc-800 text-white dark:text-zinc-100 font-extrabold border-2 border-black dark:border-white shadow-[-5px_5px_0px_#000000] dark:shadow-[-5px_5px_0px_#ffffff] hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black transition-all active:translate-x-[2px] active:translate-y-[-2px] active:shadow-none cursor-pointer rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "ADDING..." : "ADD BLOG"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;