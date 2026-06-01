"use client"

import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

export default function Layout({ children }) {
    const [profileImg, setProfileImg] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const isLoginPage = pathname === "/admin/login";

    const fetchProfileImg = async () => {
        try {
            const response = await axios.get("/api/profile");
            setProfileImg(response.data.image);
        } catch (error) {
            console.error("Error fetching admin profile image:", error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/admin/logout");
            if (response.data.success) {
                toast.success("Logged out successfully");
                router.push("/admin/login");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to logout");
        }
    };

    useEffect(() => {
        if (!isLoginPage) {
            fetchProfileImg();
        }
    }, [isLoginPage]);

    if (isLoginPage) {
        return (
            <>
                <ToastContainer theme="dark" />
                {children}
            </>
        )
    }

    return (
        <>
            <div className="flex">
                <ToastContainer theme="dark" />
                <Sidebar />
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full py-3 h-[60px] px-6 sm:px-12 border-b-2 border-black bg-white">
                        <h3 className="font-bold text-sm sm:text-lg text-black">Admin Panel</h3>
                        
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={handleLogout}
                                className="cursor-pointer bg-black text-white hover:bg-white hover:text-black border-2 border-black px-3 py-1 font-extrabold text-xs transition-colors shadow-[-2px_2px_0px_#000000] active:translate-x-[1px] active:translate-y-[-1px] active:shadow-none"
                            >
                                LOGOUT
                            </button>
                            <Image src={profileImg ? profileImg : assets.profile_icon} width={36} height={36} alt="Admin Profile" className="border-2 border-black rounded-full object-cover w-[36px] h-[36px]" />
                        </div>
                    </div>

                    {children}

                </div>
            </div>
        </>
    )
}