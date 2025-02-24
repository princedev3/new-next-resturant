const authRoute = ["/login", "/register", "/new-password", "/new-verification"];
const adminRoutes = ["/admin", "/admin/users", "/admin/sales"];

import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // const sessionResponse = await fetch(
  //   new URL("http://localhost:3000/api/session", req.url),
  //   {
  //     headers: { cookie: req.headers.get("cookie") || "" },
  //   }
  // );

  // if (!sessionResponse.ok) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // const session = await sessionResponse.json();

  // const { nextUrl } = req;

  // if (
  //   session?.user &&
  //   session.user.role !== "ADMIN" &&
  //   adminRoutes.includes(nextUrl.pathname)
  // ) {
  //   return NextResponse.redirect(new URL("/", req.nextUrl));
  // }
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
