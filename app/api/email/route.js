import { ConnectDB } from "@/lib/config/db"
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

export async function POST (request){
    try {
        await ConnectDB();
        const formData = await request.formData();
        const email = formData.get('email');
        
        if (!email || !email.trim()) {
            return NextResponse.json({ success: false, msg: "Email is required" }, { status: 400 });
        }

        const emailData = {
            email: `${email.trim()}`
        }
        await EmailModel.create(emailData)
        return NextResponse.json({success:true, msg: "Email Subscribed"})
    } catch (error) {
        console.error("POST Email Error:", error.message);
        return NextResponse.json({ success: false, msg: "Error subscribing: " + error.message }, { status: 500 });
    }
}

export async function GET(request){
    try {
        await ConnectDB();
        const emails = await EmailModel.find({});
        return NextResponse.json({emails});
    } catch (error) {
        console.error("GET Emails Error:", error.message);
        return NextResponse.json({ success: false, msg: "Error fetching subscriptions: " + error.message }, { status: 500 });
    }
}

export async function DELETE(request){
    try {
        await ConnectDB();
        const id = request.nextUrl.searchParams.get('id')
        if (!id) {
            return NextResponse.json({ success: false, msg: "ID is required" }, { status: 400 });
        }
        const email = await EmailModel.findById(id);
        if (!email) {
            return NextResponse.json({ success: false, msg: "Subscription not found" }, { status: 404 });
        }
        await EmailModel.findByIdAndDelete(id);
        return NextResponse.json({success:true, msg:"Email Deleted"});
    } catch (error) {
        console.error("DELETE Email Error:", error.message);
        return NextResponse.json({ success: false, msg: "Error deleting subscription: " + error.message }, { status: 500 });
    }
}