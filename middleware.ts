import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    })

    const { pathname } = req.nextUrl

    // Not logged in - redirect to signin
    if (!token) {
        return NextResponse.redirect(new URL("/auth/signin", req.url))
    }

    // User is logged in
    const isOnboarded = token.isOnboarded

    // Trying to access dashboard without completing onboarding
    if (!isOnboarded && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/onboarding", req.url))
    }

    // Already onboarded but trying to access onboarding page
    if (isOnboarded && pathname === "/onboarding") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
}

export const config = {
    // Only protect dashboard and onboarding, NOT auth pages
    matcher: ["/dashboard/:path*", "/onboarding"]
}
