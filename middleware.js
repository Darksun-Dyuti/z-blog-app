import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isAuthPage = path === "/admin/login";
  const isAdminPath = path.startsWith("/admin");

  const session = request.cookies.get("admin_session")?.value;

  if (isAdminPath) {
    if (!session && !isAuthPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (session && isAuthPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
