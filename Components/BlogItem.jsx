import { assets, blog_data } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ title, description, category, image, id }) => {
    return (
        <div className="max-w-[330px] sm:max-w-[300px] bg-white dark:bg-zinc-900 border-2 border-black dark:border-white shadow-[-7px_7px_0px_#000000] dark:shadow-[-7px_7px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-none dark:hover:shadow-none transition-all duration-200 flex flex-col justify-between h-full">
            <div>
                <Link href={`/blogs/${id}`}>
                    <div className="relative aspect-video overflow-hidden border-b-2 border-black dark:border-white">
                        <Image 
                            src={image} 
                            alt={title || "Blog cover"} 
                            fill 
                            className="object-cover hover:scale-105 transition-transform duration-500" 
                        />
                    </div>
                </Link>
                <div className="ml-5 mt-5">
                    <p className="px-2 py-0.5 inline-block bg-black text-white dark:bg-zinc-100 dark:text-black text-xs font-black uppercase">
                        {category}
                    </p>
                </div>

                <div className="p-5 pt-3">
                    <h5 className="mb-2 text-lg font-extrabold tracking-tight text-black dark:text-zinc-100 line-clamp-2">
                        {title}
                    </h5>
                    <div 
                        className="mb-4 text-xs font-medium text-slate-700 dark:text-zinc-300 line-clamp-3 leading-relaxed" 
                        dangerouslySetInnerHTML={{__html: description.slice(0, 120)}}
                    ></div>
                </div>
            </div>
            
            <div className="p-5 pt-0">
                <Link href={`/blogs/${id}`} className="inline-flex items-center py-2 font-black text-xs sm:text-sm text-black dark:text-zinc-100 hover:underline group">
                    Read more 
                    <Image src={assets.arrow} className="ml-2 group-hover:translate-x-1 transition-transform dark:invert" alt="" width={12} />
                </Link>
            </div>
        </div>
    );
}

export default BlogItem;