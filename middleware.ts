import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const spotifyAccessToken = request.cookies.get("spotifyAccessToken");

  if (spotifyAccessToken) {
    // If user is authenticated and trying to access the root, redirect to /mixtapes
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/mixtapes", request.url));
    }
  } else if (request.nextUrl.pathname !== "/") {
    // If user is not authenticated and trying to access any route other than root, redirect to /
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|spotify/callback).*)",
  ],
};
