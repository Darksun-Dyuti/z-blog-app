import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }) {
    return (
        <>
            <div className="flex">
                <ToastContainer theme="dark" />
                <Sidebar />
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full py-3 h-[60px] px-12 border-b-2 border-black bg-white">
                        <h3 className="font-bold text-lg text-black">Admin Panel</h3>
                        <Image src={assets.profile_icon} width={40} alt="" className="border-2 border-black rounded-full" />
                    </div>

                    {children}

                </div>
            </div>
        </>
    )
}