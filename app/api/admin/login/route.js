import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const adminUser = process.env.ADMIN_USERNAME || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "admin123";

    if (username === adminUser && password === adminPass) {
      const response = NextResponse.json({ success: true, msg: "Login successful" });
      
      response.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    }

    return NextResponse.json({ success: false, msg: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Server error: " + error.message }, { status: 500 });
  }
}
