const authRoute = ["/login", "/register", "/new-password", "/new-verification"];
const adminRoutes = ["/admin"];

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // if (session?.user && authRoute.includes(nextUrl.pathname)) {
  //   if (
  //     session.user?.customExpiration &&
  //     session.user.customExpiration * 1000 < Date.now()
  //   ) {
  //     return NextResponse.redirect(new URL("/login", req.nextUrl));
  //   }
  //   if (nextUrl.pathname !== "/" && nextUrl.pathname !== "/admin") {
  //     return NextResponse.redirect(new URL("/", req.nextUrl));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|api/session).*)", "/", "/(api|trpc)(.*)"],
  runtime: "nodejs",
};
