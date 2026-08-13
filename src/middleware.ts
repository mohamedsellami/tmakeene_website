import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COMING_SOON_ENABLED } from "@/lib/coming-soon";

export function middleware(request: NextRequest) {
  if (!COMING_SOON_ENABLED) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/coming-soon") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon.ico|assets/|downloads/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
