import { NextResponse } from "next/server";

export async function POST(request) {
  const response = NextResponse.json({ success: true, msg: "Logged out successfully" });
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return response;
}
