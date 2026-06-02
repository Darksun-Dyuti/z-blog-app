import { assets } from "@/Assets/assets";
import Image from "next/image";

const Footer = () => {
    return (
        <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center border-t-2 border-black dark:border-zinc-800">
            <Image src={assets.logo_light} alt="Blogger Light Logo" width={120} />
            <p className="text-sm text-white font-medium">All rights reserved. Copyright @blogger</p>
                <div className="flex gap-2">
                    <Image src={assets.facebook_icon} alt="Facebook Link" width={40} className="cursor-pointer hover:scale-105 transition-transform" />
                    <Image src={assets.twitter_icon} alt="Twitter Link" width={40} className="cursor-pointer hover:scale-105 transition-transform" />
                    <Image src={assets.googleplus_icon} alt="Google Plus Link" width={40} className="cursor-pointer hover:scale-105 transition-transform" />
                </div>
        </div>
    );
}

export default Footer;