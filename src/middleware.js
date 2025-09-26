import { clerkMiddleware, createRouteMatcher, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

// export function middleware(request) {
//   // Check if user is authenticated for protected routes
//   const token = request.cookies.get("auth-token")
//   const { pathname } = request.nextUrl
//
//   // Protected routes
//   const protectedRoutes = ["/admin", "/profile"]
//   const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
//
//   if (isProtectedRoute && !token) {
//     return NextResponse.redirect(new URL("/login", request.url))
//   }
//
//   return NextResponse.next()
// }

const isProtectedRoute = createRouteMatcher(['/admin(.*)', '/clubs(.*)', '/events(.*)', '/api(.*)']);

const isPublicRoute = createRouteMatcher(['/login(.*)', '/', 'forgot-password(.*)'])

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();

    // const { isAuthenticated, redirectToSignIn } = await auth()
    // if (!isAuthenticated && isProtectedRoute(req)) {
    //     // Add custom logic to run before redirecting
    //     return redirectToSignIn()
    // }
    // if (!isPublicRoute(req)) {
    //     await auth.protect()
    // }
});

export const config = {
  matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
  ],
}
