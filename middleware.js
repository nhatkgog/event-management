import { NextResponse } from "next/server"

export function middleware(request) {
  // Check if user is authenticated for protected routes
  const token = request.cookies.get("auth-token")
  const { pathname } = request.nextUrl

  // Protected routes
  const protectedRoutes = ["/admin", "/profile"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
}
