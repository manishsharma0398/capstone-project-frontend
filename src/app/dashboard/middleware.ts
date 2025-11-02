import tokenServer from "@/utils/serverToken";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
  console.log("IIIIIIIIIIIIIIIIIII");
  const path = req.nextUrl.pathname;

  // 3. Decrypt the session from the cookie
  const cookie = await tokenServer.decode();

  if (!cookie) {
    return NextResponse.redirect(
      new URL(`/auth/login?redirectTo=${path}`, req.nextUrl)
    );
  }

  const role = cookie.role;

  if (role === "volunteer") {
    return NextResponse.next();
  }

  if (role === "organization") {
    return NextResponse.redirect(new URL("/org-dashboard", req.nextUrl));
  }

  if (role === "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
