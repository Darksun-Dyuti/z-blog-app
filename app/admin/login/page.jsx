"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { assets } from "@/Assets/assets";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/admin/login", { username, password });
            if (response.data.success) {
                toast.success(response.data.msg);
                router.push("/admin");
            }
        } catch (error) {
            console.error("Login failed:", error);
            const msg = error.response?.data?.msg || "Invalid username or password";
            toast.error(msg);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
            <div className="mb-8">
                <Image src={assets.logo} width={180} height={50} alt="Logo" className="w-[150px] sm:w-[180px] h-auto" />
            </div>
            <div className="w-full max-w-[450px] bg-white border-2 border-black p-8 shadow-[-8px_8px_0px_#000000]">
                <h2 className="text-2xl font-black text-black mb-6 text-center border-b-2 border-black pb-4">
                    ADMIN LOGIN
                </h2>
                <form onSubmit={onSubmitHandler} className="space-y-6">
                    <div>
                        <label className="block text-sm font-extrabold text-black mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-black outline-none font-medium text-black focus:shadow-[-4px_4px_0px_#000000] transition-all bg-white"
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-extrabold text-black mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-black outline-none font-medium text-black focus:shadow-[-4px_4px_0px_#000000] transition-all bg-white"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 bg-[#ffc400] text-black font-black border-2 border-black shadow-[-5px_5px_0px_#000000] hover:bg-white transition-all active:translate-x-[2px] active:translate-y-[-2px] active:shadow-none cursor-pointer text-center text-sm"
                    >
                        LOG IN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
