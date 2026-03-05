import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isAdminPath = path.startsWith("/admin");

    if (isAdminPath) {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development" });

        if (!token) {
            const url = new URL("/login", req.url);
            url.searchParams.set("callbackUrl", encodeURI(req.url));
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
    ]
};
