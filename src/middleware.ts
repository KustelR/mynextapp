import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as fs from "fs/promises";
import path from "path";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const searchParams =
    request.nextUrl.searchParams + "" ? "?" + request.nextUrl.searchParams : "";
  const apiVersion = request.nextUrl.pathname.slice(5, 8);
  if (apiVersion.includes("v2")) {
    return NextResponse.redirect(
      new URL(process.env.API_HOST + pathname + searchParams, request.url)
    );
  } else if (apiVersion.includes("v1")) {
    return NextResponse.redirect(
      new URL(
        process.env.API_HOST_LEGACY + pathname + searchParams,
        request.url
      )
    );
  }
  if(request.nextUrl.pathname.includes("/assets/")) {
    let target;
    try {
      target = fs.readFile(path.join("../public", request.nextUrl.pathname))
      console.log(target);
      return new NextResponse(target, {
        headers: {
          "Content-Type": "image/png",
        },
      });
    } catch (err) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/api/v1/:path*",
    "/auth/v1/:path*",
    "/api/v2/:path*",
    "/auth/v2/:path*",
    "/resource/:path*",
  ],
};
