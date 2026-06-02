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
    const [saving, setSaving] = useState(false);

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
            setSaving(true);
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
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-slate-50 dark:bg-zinc-950 min-h-screen p-6 sm:p-10 border-t-2 border-black dark:border-zinc-800 w-full transition-colors">
            <div className="max-w-[650px] bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-6 sm:p-10 shadow-[-8px_8px_0px_#000000] dark:shadow-[-8px_8px_0px_#ffffff] transition-all">
                <h2 className="text-2xl font-black text-black dark:text-zinc-100 mb-8 border-b-2 border-black dark:border-zinc-800 pb-4">Edit Admin Profile</h2>
                <form onSubmit={onSubmitHandler}>
                    <p className="text-base font-extrabold text-black dark:text-zinc-100">Profile Avatar</p>

                    <label htmlFor="profileImage" className="inline-block mt-3">
                        <div className="cursor-pointer border-2 border-dashed border-black dark:border-white bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 flex items-center justify-center p-1 transition-colors w-[100px] h-[100px] rounded-full overflow-hidden shadow-[-3px_3px_0px_#000000] dark:shadow-[-3px_3px_0px_#ffffff] active:translate-x-[1px] active:translate-y-[-1px] active:shadow-none">
                            <img 
                                alt='Avatar' 
                                src={previewUrl ? previewUrl : assets.profile_icon.src || assets.profile_icon} 
                                className="object-cover w-full h-full rounded-full dark:invert" 
                                style={{ filter: previewUrl ? "none" : "" }}
                            />
                        </div>
                    </label>
                    <input onChange={handleImageChange} type="file" id="profileImage" hidden />

                    <p className="text-base font-extrabold text-black dark:text-zinc-100 mt-6">Display Name</p>
                    <input 
                        type="text"
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="w-full mt-2 px-4 py-3 border-2 border-black dark:border-white outline-none font-bold text-black dark:text-zinc-100 focus:shadow-[-4px_4px_0px_#000000] dark:focus:shadow-[-4px_4px_0px_#ffffff] transition-all bg-white dark:bg-zinc-800 placeholder-slate-500 dark:placeholder-zinc-400 rounded-none" 
                        placeholder="Dyutimoy Bhunia" 
                        required 
                    />

                    <p className="text-base font-extrabold text-black dark:text-zinc-100 mt-6">Author Bio</p>
                    <textarea 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)} 
                        className="w-full mt-2 px-4 py-3 border-2 border-black dark:border-white outline-none font-semibold text-black dark:text-zinc-100 focus:shadow-[-4px_4px_0px_#000000] dark:focus:shadow-[-4px_4px_0px_#ffffff] transition-all bg-white dark:bg-zinc-800 resize-y placeholder-slate-500 dark:placeholder-zinc-400 rounded-none" 
                        placeholder="Write biography here" 
                        rows={3} 
                        required 
                    />

                    <p className="text-base font-extrabold text-black dark:text-zinc-100 mt-6">LinkedIn Link</p>
                    <input 
                        type="url"
                        value={linkedin} 
                        onChange={(e) => setLinkedin(e.target.value)} 
                        className="w-full mt-2 px-4 py-3 border-2 border-black dark:border-white outline-none font-medium text-black dark:text-zinc-100 focus:shadow-[-4px_4px_0px_#000000] dark:focus:shadow-[-4px_4px_0px_#ffffff] transition-all bg-white dark:bg-zinc-800 placeholder-slate-500 dark:placeholder-zinc-400 rounded-none" 
                        placeholder="https://linkedin.com/in/username" 
                    />

                    <p className="text-base font-extrabold text-black dark:text-zinc-100 mt-6">GitHub Link</p>
                    <input 
                        type="url"
                        value={github} 
                        onChange={(e) => setGithub(e.target.value)} 
                        className="w-full mt-2 px-4 py-3 border-2 border-black dark:border-white outline-none font-medium text-black dark:text-zinc-100 focus:shadow-[-4px_4px_0px_#000000] dark:focus:shadow-[-4px_4px_0px_#ffffff] transition-all bg-white dark:bg-zinc-800 placeholder-slate-500 dark:placeholder-zinc-400 rounded-none" 
                        placeholder="https://github.com/username" 
                    />

                    <br />
                    <button 
                        type="submit" 
                        disabled={saving}
                        className="mt-8 w-44 h-12 bg-black dark:bg-zinc-800 text-white dark:text-zinc-100 font-extrabold border-2 border-black dark:border-white shadow-[-5px_5px_0px_#000000] dark:shadow-[-5px_5px_0px_#ffffff] hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black transition-all active:translate-x-[2px] active:translate-y-[-2px] active:shadow-none cursor-pointer rounded-none disabled:opacity-50"
                    >
                        {saving ? "SAVING..." : "SAVE PROFILE"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;
