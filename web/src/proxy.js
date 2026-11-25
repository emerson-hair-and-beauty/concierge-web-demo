import { NextResponse } from "next/server";
import { ADVISOR_ONLY } from "@/config/features";

// In advisor-only mode, send every page except "/" to "/".
// The matcher skips "/", the API routes, Next.js assets, and files with an
// extension (icons, manifest.json, sw.js).
export function proxy(request) {
  if (!ADVISOR_ONLY) return NextResponse.next();
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!api/|_next/|.*\\..*).+)"],
};
