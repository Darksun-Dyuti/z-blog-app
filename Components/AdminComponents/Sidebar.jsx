"use client"

import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/context/ThemeContext";

const Sidebar = () => {
    const pathname = usePathname();
    const { theme } = useTheme();

    const getLinkClass = (path) => {
        const baseClass = "flex items-center border-2 border-black dark:border-white gap-3 font-extrabold px-3 py-2 sm:px-4 sm:py-3 transition-all duration-200 w-full justify-center sm:justify-start rounded-none ";
        const activeClass = "bg-[#ffc400] dark:bg-zinc-100 text-black shadow-[-3px_3px_0px_#000000] dark:shadow-[-3px_3px_0px_#ffffff]";
        const inactiveClass = "bg-white text-black dark:bg-zinc-800 dark:text-zinc-100 shadow-[-5px_5px_0px_#000000] dark:shadow-[-5px_5px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-7px_7px_0px_#000000] dark:hover:shadow-[-7px_7px_0px_#ffffff] active:translate-x-0 active:translate-y-0 active:shadow-none";
        
        return baseClass + (pathname === path ? activeClass : inactiveClass);
    };

    return (
        <div className="flex flex-col bg-slate-50 dark:bg-zinc-950 border-r-2 border-black dark:border-zinc-800 h-screen w-20 sm:w-72 md:w-80 transition-colors">
            <div className="h-[60px] px-4 sm:pl-14 border-b-2 border-black dark:border-zinc-800 flex items-center bg-white dark:bg-zinc-900 justify-center sm:justify-start transition-colors">
                <Link href="/" className="inline-block">
                    <Image 
                        src={theme === "dark" ? assets.logo_light : assets.logo} 
                        width={120} 
                        alt="Blogger Logo" 
                        className="w-[90px] sm:w-[120px]" 
                    />
                </Link>
            </div>
            
            <div className="flex-1 py-12 px-2 sm:px-6 md:px-8 space-y-6 bg-slate-50 dark:bg-zinc-950 transition-colors">
                <Link href="/admin/addProduct" className={getLinkClass("/admin/addProduct")}>
                    <Image src={assets.add_icon} alt="" width={24} className="w-5 sm:w-6 dark:invert" />
                    <p className="hidden sm:block text-sm md:text-base">Add blogs</p>
                </Link>
                <Link href="/admin/bloglist" className={getLinkClass("/admin/bloglist")}>
                    <Image src={assets.blog_icon} alt="" width={24} className="w-5 sm:w-6 dark:invert" />
                    <p className="hidden sm:block text-sm md:text-base">Blog list</p>
                </Link>
                <Link href="/admin/subscriptions" className={getLinkClass("/admin/subscriptions")}>
                    <Image src={assets.email_icon} alt="" width={24} className="w-5 sm:w-6 dark:invert" />
                    <p className="hidden sm:block text-sm md:text-base">Subscriptions</p>
                </Link>
                <Link href="/admin/profile" className={getLinkClass("/admin/profile")}>
                    <Image src={assets.profile_icon} alt="" width={24} className="w-5 sm:w-6 rounded-full border border-black dark:border-white" />
                    <p className="hidden sm:block text-sm md:text-base">Profile</p>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;