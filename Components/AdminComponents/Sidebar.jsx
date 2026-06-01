"use client"

import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    const getLinkClass = (path) => {
        const baseClass = "flex items-center border-2 border-black gap-3 font-bold px-3 py-2 sm:px-4 sm:py-3 transition-all duration-200 w-full justify-center sm:justify-start ";
        const activeClass = "bg-[#ffc400] shadow-[-3px_3px_0px_#000000]";
        const inactiveClass = "bg-white shadow-[-5px_5px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-7px_7px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none";
        
        return baseClass + (pathname === path ? activeClass : inactiveClass);
    };

    return (
        <div className="flex flex-col bg-slate-50 border-r-2 border-black h-screen w-20 sm:w-72 md:w-80">
            <div className="h-[60px] px-4 sm:pl-14 border-b-2 border-black flex items-center bg-white justify-center sm:justify-start">
                <Link href="/" className="inline-block">
                    <Image src={assets.logo} width={120} alt="Logo" className="w-[90px] sm:w-[120px]" />
                </Link>
            </div>
            
            <div className="flex-1 py-12 px-2 sm:px-6 md:px-8 space-y-6">
                <Link href="/admin/addProduct" className={getLinkClass("/admin/addProduct")}>
                    <Image src={assets.add_icon} alt="" width={24} className="w-5 sm:w-6" />
                    <p className="hidden sm:block text-sm md:text-base text-black">Add blogs</p>
                </Link>
                <Link href="/admin/bloglist" className={getLinkClass("/admin/bloglist")}>
                    <Image src={assets.blog_icon} alt="" width={24} className="w-5 sm:w-6" />
                    <p className="hidden sm:block text-sm md:text-base text-black">Blog list</p>
                </Link>
                <Link href="/admin/subscriptions" className={getLinkClass("/admin/subscriptions")}>
                    <Image src={assets.email_icon} alt="" width={24} className="w-5 sm:w-6" />
                    <p className="hidden sm:block text-sm md:text-base text-black">Subscriptions</p>
                </Link>
                <Link href="/admin/profile" className={getLinkClass("/admin/profile")}>
                    <Image src={assets.profile_icon} alt="" width={24} className="w-5 sm:w-6 rounded-full border border-black" />
                    <p className="hidden sm:block text-sm md:text-base text-black">Profile</p>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;