import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import mongoose from "mongoose";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zblogapp.vercel.app";
  
  // Define static routes
  const routes = [
    "",
    "/profile",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Generate dynamic blog post routes
  try {
    await ConnectDB();
    const blogs = await BlogModel.find({}).select("_id date").lean();
    const blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog._id}`,
      lastModified: blog.date || new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
    return [...routes, ...blogRoutes];
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
    return routes;
  } finally {
    try {
      // Cleanly close connection and reset cache to prevent open handles during build phase
      await mongoose.disconnect();
      if (global.mongoose) {
        global.mongoose.conn = null;
        global.mongoose.promise = null;
      }
    } catch (disconnectError) {
      console.error("Error disconnecting Mongoose in sitemap:", disconnectError);
    }
  }
}
