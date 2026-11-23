import { NextResponse, NextRequest } from "next/server";

//https://nextjs.org/docs/15/pages/api-reference/file-conventions/middleware

export function middleware(request: NextRequest) {
  // get token from cookies
  const token = request.cookies.get("auth_token")?.value;

  if (token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // proceed with out redirection
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
