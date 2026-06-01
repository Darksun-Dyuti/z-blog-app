"use client"

import { assets } from "@/Assets/assets";
import Image from "next/image";

const BlogTableItem = ({ authorImg, title, author, date, deleteBlog, mongoId }) => {
    const BlogDate = new Date(date);

    return (
        <tr className="bg-white hover:bg-slate-50 transition-colors">
            <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <Image src={authorImg ? authorImg : assets.profile_icon} className="rounded-full border-2 border-black" width={36} height={36} alt="" />
                    <p className="font-extrabold text-black text-xs sm:text-sm">{author ? author : "No author"}</p>
                </div>
            </td>
            <td className="px-6 py-4 font-extrabold text-black text-xs sm:text-sm">
                {title ? title : "No title"}
            </td>
            <td className="px-6 py-4 font-bold text-slate-700 text-xs sm:text-sm whitespace-nowrap">
                {BlogDate.toDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <button 
                    onClick={() => deleteBlog(mongoId)}
                    className="cursor-pointer bg-[#ff1744] text-white border-2 border-black px-3 py-1 font-black text-xs shadow-[-2px_2px_0px_#000000] hover:bg-white hover:text-black hover:translate-x-[1px] hover:translate-y-[-1px] hover:shadow-none active:translate-x-0 active:translate-y-0 transition-all duration-100"
                >
                    DELETE
                </button>
            </td>
        </tr>
    );
}

export default BlogTableItem;