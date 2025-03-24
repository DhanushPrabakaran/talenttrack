import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = [
  "/profile",
  "/dashboard",
  "/middleware",
  "/themes",
  "/signout",
  "/project",
  "/experience",
];

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname, origin } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!session && isProtected) {
    const loginUrl = new URL("/signin", origin);
    loginUrl.searchParams.set("callbackUrl", pathname); // Save original path for redirection
    return NextResponse.redirect(loginUrl);
  }

  if (session && pathname === "/signin") {
    return NextResponse.redirect(new URL("/", origin)); // Redirect to home or dashboard
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
