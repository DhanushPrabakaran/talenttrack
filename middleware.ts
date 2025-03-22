import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const studentRoutes = ["/profile", "/dashboard", "/project", "/experience"];
const adminRoutes = ["/middleware", "/themes", "/signout"];
const commonProtectedRoutes = [...studentRoutes, ...adminRoutes]; // All protected routes

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  const isProtected = commonProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If not authenticated and trying to access a protected route -> Redirect to login
  if (!session && isProtected) {
    const loginUrl = new URL("/signin", request.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated but tries to access `/signin`, redirect to home
  if (session && pathname === "/signin") {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  // Role-based protection
  const userRole = session?.user?.role; // Assuming session includes `role`

  if (session) {
    if (studentRoutes.includes(pathname) && userRole !== "student") {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }
    if (adminRoutes.includes(pathname) && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
