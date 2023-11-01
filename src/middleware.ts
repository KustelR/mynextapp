import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const searchParams = ((request.nextUrl.searchParams + "") ? "?" + request.nextUrl.searchParams : "");
  const apiVersion = request.nextUrl.pathname.slice(5,8);
  if (apiVersion === "v2") {
    return NextResponse.redirect(new URL(process.env.API_HOST + pathname + searchParams, request.url))
  }
  else {
    return NextResponse.redirect(new URL(process.env.API_HOST_LEGACY + pathname + searchParams, request.url))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/v1/:path*', '/auth/v1/:path*', '/api/v2/:path*', '/auth/v2/:path*'],
}
