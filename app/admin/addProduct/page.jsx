"use client"

import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const page = () => {

    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Dyutimoy Bhunia",
        authorImg: "/author_img.png"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }))

        console.log(data)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        if (!image) {
            toast.error("Please upload a thumbnail image");
            return;
        }

        try {
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
                    author: "Dyutimoy Bhunia",
                    authorImg: "/author_img.png"
                })
            }
            else {
                toast.error(response.data.msg || "Error adding blog");
            }
        } catch (error) {
            console.error("Add blog error:", error);
            const errMsg = error.response?.data?.msg || "Failed to add blog. Please try again.";
            toast.error(errMsg);
        }
    }

    return (
        <div className="bg-slate-50 min-h-screen p-6 sm:p-10 border-t-2 border-black w-full">
            <div className="max-w-[650px] bg-white border-2 border-black p-6 sm:p-10 shadow-[-8px_8px_0px_#000000]">
                <h2 className="text-2xl font-black text-black mb-8 border-b-2 border-black pb-4">Add New Blog Post</h2>
                <form onSubmit={onSubmitHandler}>
                    <p className="text-base font-extrabold text-black">Upload Thumbnail</p>

                    <label htmlFor="image" className="inline-block mt-3">
                        <div className="cursor-pointer border-2 border-dashed border-black bg-slate-50 hover:bg-slate-100 flex items-center justify-center p-3 transition-colors w-[150px] h-[80px] shadow-[-3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[-1px] active:shadow-[-2px_2px_0px_#000000]">
                            <Image alt='img' src={!image ? assets.upload_area : URL.createObjectURL(image)} width={130} height={60} className="object-contain max-h-[60px]" />
                        </div>
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />

                    <p className="text-base font-extrabold text-black mt-6">Blog Title</p>
                    <input name="title" onChange={onChangeHandler} value={data.title} className="w-full mt-2 px-4 py-3 border-2 border-black outline-none font-medium text-black focus:shadow-[-4px_4px_0px_#000000] transition-all bg-white" type="text" placeholder="Type title here" required />

                    <p className="text-base font-extrabold text-black mt-6">Blog Description</p>
                    <textarea name="description" onChange={onChangeHandler} value={data.description} className="w-full mt-2 px-4 py-3 border-2 border-black outline-none font-medium text-black focus:shadow-[-4px_4px_0px_#000000] transition-all bg-white resize-y" placeholder="Write content here" rows={6} required />

                    <p className="text-base font-extrabold text-black mt-6">Blog Category</p>
                    <select name="category" onChange={onChangeHandler} value={data.category} className="w-44 mt-2 px-4 py-3 border-2 border-black outline-none font-bold text-black bg-white focus:shadow-[-4px_4px_0px_#000000] transition-all cursor-pointer">
                        <option value="Startup">Startup</option>
                        <option value="Technology">Technology</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>

                    <br />
                    <button type="submit" className="mt-8 w-44 h-12 bg-black text-white font-extrabold border-2 border-black shadow-[-5px_5px_0px_#000000] hover:bg-white hover:text-black transition-all active:translate-x-[2px] active:translate-y-[-2px] active:shadow-[-3px_3px_0px_#000000] cursor-pointer">
                        ADD BLOG
                    </button>
                </form>
            </div>
        </div>
    );
}

export default page;