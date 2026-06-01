"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "@/Assets/assets";

const AdminProfile = () => {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");

    const fetchProfile = async () => {
        try {
            const response = await axios.get("/api/profile");
            const data = response.data;
            setName(data.name || "");
            setBio(data.bio || "");
            setLinkedin(data.linkedin || "");
            setGithub(data.github || "");
            setPreviewUrl(data.image || "");
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error("Failed to load profile details");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("bio", bio);
            formData.append("linkedin", linkedin);
            formData.append("github", github);
            if (image) {
                formData.append("image", image);
            }

            const response = await axios.post("/api/profile", formData);
            if (response.data.success) {
                toast.success("Profile updated successfully!");
                fetchProfile();
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error.response?.data?.msg || "Failed to update profile");
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen p-6 sm:p-10 border-t-2 border-black w-full">
            <div className="max-w-[650px] bg-white border-2 border-black p-6 sm:p-10 shadow-[-8px_8px_0px_#000000]">
                <h2 className="text-2xl font-black text-black mb-8 border-b-2 border-black pb-4">Edit Admin Profile</h2>
                <form onSubmit={onSubmitHandler}>
                    <p className="text-base font-extrabold text-black">Profile Avatar</p>

                    <label htmlFor="profileImage" className="inline-block mt-3">
                        <div className="cursor-pointer border-2 border-dashed border-black bg-slate-50 hover:bg-slate-100 flex items-center justify-center p-1 transition-colors w-[100px] h-[100px] rounded-full overflow-hidden shadow-[-3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[-1px] active:shadow-none">
                            <img 
                                alt='Avatar' 
                                src={previewUrl ? previewUrl : assets.profile_icon.src || assets.profile_icon} 
                                className="object-cover w-full h-full rounded-full" 
                            />
                        </div>
                    </label>
                    <input onChange={handleImageChange} type="file" id="profileImage" hidden />

                    <p className="text-base font-extrabold text-black mt-6">Display Name</p>
                    <input 
                        type="text"
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="w-full mt-2 px-4 py-3 border-2 border-black outline-none font-medium text-black focus:shadow-[-4px_4px_0px_#000000] transition-all bg-white" 
                        placeholder="Dyutimoy Bhunia" 
                        required 
                    />

                    <p className="text-base font-extrabold text-black mt-6">Author Bio</p>
                    <textarea 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)} 
                        className="w-full mt-2 px-4 py-3 border-2 border-black outline-none font-medium text-black focus:shadow-[-4px_4px_0px_#000000] transition-all bg-white resize-y" 
                        placeholder="Write dynamic biography here" 
                        rows={3} 
                        required 
                    />

                    <p className="text-base font-extrabold text-black mt-6">LinkedIn Link</p>
                    <input 
                        type="url"
                        value={linkedin} 
                        onChange={(e) => setLinkedin(e.target.value)} 
                        className="w-full mt-2 px-4 py-3 border-2 border-black outline-none font-medium text-black focus:shadow-[-4px_4px_0px_#000000] transition-all bg-white" 
                        placeholder="https://linkedin.com/in/username" 
                    />

                    <p className="text-base font-extrabold text-black mt-6">GitHub Link</p>
                    <input 
                        type="url"
                        value={github} 
                        onChange={(e) => setGithub(e.target.value)} 
                        className="w-full mt-2 px-4 py-3 border-2 border-black outline-none font-medium text-black focus:shadow-[-4px_4px_0px_#000000] transition-all bg-white" 
                        placeholder="https://github.com/username" 
                    />

                    <br />
                    <button type="submit" className="mt-8 w-44 h-12 bg-black text-white font-extrabold border-2 border-black shadow-[-5px_5px_0px_#000000] hover:bg-white hover:text-black transition-all active:translate-x-[2px] active:translate-y-[-2px] active:shadow-none cursor-pointer">
                        SAVE PROFILE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;
