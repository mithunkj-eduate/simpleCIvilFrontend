// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl;

//   // redirect ONLY homepage if version missing
//   if (url.pathname === "/" && !url.searchParams.has("v")) {
//     url.searchParams.set("v", "2");
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/",
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // redirect ONLY homepage if version missing
  if (url.pathname === "/" && !url.searchParams.has("v")) {
    url.searchParams.set("v", "1");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
