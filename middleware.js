import { NextResponse } from "next/server";
import { verifySession } from "@/lib/utils/session";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isAuthPage = path === "/admin/login";
  const isAdminPath = path.startsWith("/admin");

  const session = request.cookies.get("admin_session")?.value;
  const isValidSession = await verifySession(session);

  if (isAdminPath) {
    if (!isValidSession && !isAuthPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (isValidSession && isAuthPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
