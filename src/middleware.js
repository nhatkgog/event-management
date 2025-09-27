import { clerkMiddleware, createRouteMatcher, getAuth } from '@clerk/nextjs/server';
import { getCurrentUserPrivateMetadata } from "./lib/auth-utils";
import {NextResponse} from "next/server";

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

const isProtectedRoute = createRouteMatcher(['/admin(.*)', '/clubs(.*)', '/events(.*)', '/forgot-password(.*)', '']);

const isPublicRoutes = createRouteMatcher(['/login(.*)', '/'])

const isPublicRoute = createRouteMatcher(['/login(.*)', '/forgot-password(.*)']);

export default clerkMiddleware(async (auth, req) => {
    const { isAuthenticated, redirectToSignIn, isSignedIn } = await auth()


    if (isProtectedRoute(req) && process.env.NODE_ENV !== 'development') await auth.protect();

    // const { isAuthenticated, redirectToSignIn } = await auth()
    // if (!isAuthenticated && isProtectedRoute(req)) {
    //     // Add custom logic to run before redirecting
    //     return redirectToSignIn()
    // }

    if (!isPublicRoutes(req) && !isAuthenticated && process.env.NODE_ENV !== 'development') {
        await auth.protect();
    }
    if (isPublicRoute(req) && isAuthenticated && process.env.NODE_ENV !== 'development') {
        return NextResponse.redirect(new URL("/", req.url));
    }
});

export const config = {
  matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
  ],
}
