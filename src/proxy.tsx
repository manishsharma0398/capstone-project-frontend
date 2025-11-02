import tokenServer from "@/utils/serverToken";
import { NextRequest, NextResponse } from "next/server";

// 1. Specify protected and public routes
// const protectedRoutes = ["/dashboard", "/org-dashboard"];
const publicRoutes = ["/auth", "/success-google"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  // const isProtectedRoute = protectedRoutes.some((route) =>
  //   path.startsWith(route)
  // );
  const isPublicRoute =
    path === "/" || publicRoutes.some((route) => path.startsWith(route));

  // 3. Decrypt the session from the cookie
  const cookie = await tokenServer.decode();

  // 5. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && cookie) {
    const role = cookie.role;

    if (role === "organization") {
      return NextResponse.redirect(new URL("/org-dashboard", req.nextUrl));
    }

    if (role === "volunteer") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  // if (isProtectedRoute && !cookie) {
  //   return NextResponse.redirect(
  //     new URL(`/auth/login?redirectTo=${path}`, req.nextUrl)
  //   );
  // }

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
