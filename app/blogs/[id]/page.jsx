"use client"

import React, { useEffect, useState } from "react";
import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = ({ params }) => {
    const { id } = React.use(params);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get("/api/blog", {
                params: {
                    id: id
                }
            });
            setData(response.data);
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
    }, [id])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-black"></div>
                <p className="mt-4 text-black font-extrabold text-lg">Loading Blog Post...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
                <div className="bg-white border-2 border-black p-8 max-w-[450px] text-center shadow-[-6px_6px_0px_#000000]">
                    <h2 className="text-2xl font-black text-black mb-4">Blog Post Not Found</h2>
                    <p className="text-slate-700 font-medium mb-6">The article you are looking for does not exist or may have been deleted.</p>
                    <Link href="/">
                        <button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black px-6 py-2 font-extrabold text-sm transition-all shadow-[-4px_4px_0px_#000000] active:translate-x-[2px] active:translate-y-[-2px] active:shadow-none cursor-pointer">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
        <ToastContainer theme="dark" />
        <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <Image src={assets.logo} width={180} alt="" className="w-[130px] sm:w-auto" />
                </Link>
                <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
                    Get started
                    <Image src={assets.arrow} alt="" />
                </button>
            </div>

            <div className="text-center my-24">
                <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
                <Image className="mx-auto mt-6 border border-white rounded-full" src={data.authorImg} width={60} height={60} alt="" />
                <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
                    <Link
                        href="/profile"
                        className="text-inherit font-bold underline hover:no-underline"
                    >
                        {data.author}
                    </Link>
                </p>

            </div>
        </div>

        <div className="max-w-[800px] md:mx-auto mt-[-100px] mb-10">
            <Image className="border-4 border-white" src={data.image} width={1280} height={720} alt="" />
            
            
           <div className="blog-content" dangerouslySetInnerHTML={{__html:data.description}}>

           </div>


            <div className="my-24">
                <p className="text-black font-semibold my-4">Share this article on social media</p>
                <div className="flex">
                    <Image src={assets.facebook_icon} width={50} alt="" />
                    <Image src={assets.twitter_icon} width={50} alt="" />
                    <Image src={assets.googleplus_icon} width={50} alt="" />
                </div>
            </div>

        </div>

        <Footer />
        </>
    );
}

export default page;