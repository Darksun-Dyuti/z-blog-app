import { ConnectDB } from "@/lib/config/db"
import { NextResponse } from "next/server"
import { writeFile } from 'fs/promises'
import BlogModel from "@/lib/models/BlogModel"
import fs from 'fs'

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
        const nameWithNoSpaces = image.name.replace(/\s+/g, '_');
        const path = `./public/${timestamp}_${nameWithNoSpaces}`;
        await writeFile(path, buffer);
        const imgUrl = `/${timestamp}_${nameWithNoSpaces}`;

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
        
        const id = await request.nextUrl.searchParams.get('id')
        console.log(id)
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return NextResponse.json({msg: "Blog not found"}, { status: 404 });
        }
        fs.unlink(`./public${blog.image}`, ()=>{});
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