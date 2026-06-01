import { ConnectDB } from "@/lib/config/db";
import ProfileModel from "@/lib/models/ProfileModel";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';

export async function GET(request) {
    try {
        await ConnectDB();
        let profile = await ProfileModel.findOne();
        if (!profile) {
            // Seed a default profile on the first request if it doesn't exist
            profile = await ProfileModel.create({
                name: "Dyutimoy Bhunia",
                bio: "Full Stack Developer & Technical Writer",
                image: "/author_img.png",
                linkedin: "https://www.linkedin.com/in/dyutimoy-bhunia-7241a1254/",
                github: "https://github.com"
            });
        }
        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Error fetching profile: " + error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await ConnectDB();
        const formData = await request.formData();
        const name = formData.get('name');
        const bio = formData.get('bio');
        const linkedin = formData.get('linkedin');
        const github = formData.get('github');
        const image = formData.get('image');

        let updateData = {
            name: `${name}`,
            bio: `${bio}`,
            linkedin: `${linkedin}`,
            github: `${github}`
        };

        if (image && typeof image === "object") {
            const timestamp = Date.now();
            const imageByteData = await image.arrayBuffer();
            const buffer = Buffer.from(imageByteData);
            const nameWithNoSpaces = image.name.replace(/\s+/g, '_');
            const path = `./public/${timestamp}_${nameWithNoSpaces}`;
            await writeFile(path, buffer);
            updateData.image = `/${timestamp}_${nameWithNoSpaces}`;
        }

        let profile = await ProfileModel.findOne();
        if (profile) {
            profile = await ProfileModel.findByIdAndUpdate(profile._id, updateData, { new: true });
        } else {
            profile = await ProfileModel.create(updateData);
        }

        return NextResponse.json({ success: true, msg: "Profile updated successfully", profile });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Error updating profile: " + error.message }, { status: 500 });
    }
}
