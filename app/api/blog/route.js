import { ConnectDB } from "@/lib/config/db"
import { NextResponse } from "next/server"
import { writeFile } from 'fs/promises'
import BlogModel from "@/lib/models/BlogModel"
import fs from 'fs'
import path from "path"
import { verifyAdminSession } from "@/lib/utils/auth"

// API Endpoint to get all blogs
export async function GET(request) {
    try {
        await ConnectDB();
        
        const blogId = request.nextUrl.searchParams.get("id");
        if(blogId){
            const blog = await BlogModel.findById(blogId);
            return NextResponse.json(blog);
        }
        
        const blogs = await BlogModel.find({})
        return NextResponse.json({blogs})
    } catch (error) {
        console.error("GET Error:", error.message);
        return NextResponse.json(
            { success: false, msg: "Error fetching blogs: " + error.message },
            { status: 500 }
        );
    }
}

// API Endpoint for Uploading Blogs
export async function POST(request) {
    try {
        await ConnectDB();

        // Security: Verify Admin Session
        const isAuthed = await verifyAdminSession(request);
        if (!isAuthed) {
            return NextResponse.json(
                { success: false, msg: "Unauthorized" },
                { status: 401 }
            );
        }
        
        const formData = await request.formData();
        const timestamp = Date.now();

        const image = formData.get('image');
        if (!image) {
            return NextResponse.json(
                { success: false, msg: "Image is required" },
                { status: 400 }
            );
        }

        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        
        // Security: Sanitize filename to prevent directory traversal
        const baseName = path.basename(image.name || "image.png");
        const safeName = baseName.replace(/[^a-zA-Z0-9._-]/g, "_");
        const savePath = `./public/${timestamp}_${safeName}`;
        await writeFile(savePath, buffer);
        const imgUrl = `/${timestamp}_${safeName}`;

        const blogData = {
            title: `${formData.get('title')}`,
            description: `${formData.get('description')}`,
            category: `${formData.get('category')}`,
            author: `${formData.get('author')}`,
            image: `${imgUrl}`,
            authorImg: `${formData.get('authorImg')}`,
        }

        await BlogModel.create(blogData);

        console.log("Blog Saved")

        return NextResponse.json({ success: true, msg: "Blog Added" })
    } catch (error) {
        console.error("POST Error:", error.message);
        return NextResponse.json(
            { success: false, msg: "Error adding blog: " + error.message },
            { status: 500 }
        );
    }
}

// Creating Api Endpoint to delete Blog
export async function DELETE(request){
    try {
        await ConnectDB();

        // Security: Verify Admin Session
        const isAuthed = await verifyAdminSession(request);
        if (!isAuthed) {
            return NextResponse.json(
                { success: false, msg: "Unauthorized" },
                { status: 401 }
            );
        }
        
        const id = await request.nextUrl.searchParams.get('id')
        console.log(id)
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return NextResponse.json({msg: "Blog not found"}, { status: 404 });
        }
        
        // Security: Safely unlink file if it exists
        const fileToDelete = `./public${blog.image}`;
        if (fs.existsSync(fileToDelete)) {
            try {
                fs.unlinkSync(fileToDelete);
            } catch (unlinkErr) {
                console.error("Error unlinking image file:", unlinkErr);
            }
        }
        
        await BlogModel.findByIdAndDelete(id);
        return NextResponse.json({msg:"blog Deleted"});
    } catch (error) {
        console.error("DELETE Error:", error.message);
        return NextResponse.json(
            { msg: "Error deleting blog: " + error.message },
            { status: 500 }
        );
    }
}