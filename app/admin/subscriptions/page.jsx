"use client"

import SubsTableItem from "@/Components/AdminComponents/SubsTableItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {

    const [emails, setEmails] = useState([]);

    const fetchEmails = async () => {
        try {
            const response = await axios.get('/api/email');
            setEmails(response.data.emails || []);
        } catch (error) {
            console.error("Error fetching emails:", error);
            toast.error("Failed to fetch subscriptions list");
        }
    }

    const deleteEmail = async (mongoId) => {
        try {
            const response = await axios.delete('/api/email', {
                params: {
                    id: mongoId
                }
            })
            if (response.data.success) {
                toast.success(response.data.msg);
                fetchEmails();
            }
            else {
                toast.error(response.data.msg || "Error");
            }
        } catch (error) {
            console.error("Error deleting email:", error);
            const errMsg = error.response?.data?.msg || "Failed to delete subscription";
            toast.error(errMsg);
        }
    }

    useEffect(() => {
        fetchEmails();
    }, [])


    return (
        <div className="bg-slate-50 min-h-screen p-6 sm:p-10 border-t-2 border-black w-full">
            <h1 className="text-3xl font-black text-black mb-6">Email Subscriptions</h1>
            <div className="relative max-w-[650px] overflow-x-auto border-2 border-black bg-white shadow-[-8px_8px_0px_#000000] scrollbar-hide">
                <table className="w-full text-sm text-black border-collapse">
                    <thead className="text-xs text-left text-white uppercase bg-black border-b-2 border-black">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-black">Email</th>
                            <th scope="col" className="hidden sm:table-cell px-6 py-4 font-black">Date</th>
                            <th scope="col" className="px-6 py-4 font-black">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-black">
                        {emails.map((item, index) => {
                            return (
                                <SubsTableItem key={index} mongoId={item._id} deleteEmail={deleteEmail} email={item.email} date={item.date} />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default page;