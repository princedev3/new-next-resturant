import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
const authRoute = ["/login", "/register", "/new-password", "/new-verification"];
export default async function middleware(req: NextRequest) {
  try {
    const token = (await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })) as { expiration?: number; role?: string };

    const { pathname } = req.nextUrl;

    // if (token && authRoute.some((route) => pathname.startsWith(route))) {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }

    if (token?.expiration && token.expiration * 1000 < Date.now()) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token?.role !== "ADMIN" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/register",
    "/new-password",
    "/new-verification",
  ],
  runtime: "nodejs",
};
