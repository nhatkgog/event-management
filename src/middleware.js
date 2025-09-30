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

const isProtectedRoute = createRouteMatcher(['/o(.*)', '/notifications']);

const isPublicRoutes = createRouteMatcher(['/login', '/clubs(.*)', '/events(.*)', '/'])

const isPublicRoute = createRouteMatcher(['/login', '/forgot-password']);

export default clerkMiddleware(async (auth, req) => {

    const { isAuthenticated } = await auth();

    if (isProtectedRoute(req) && !isAuthenticated && process.env.NODE_ENV !== 'development') {
        return auth.protect(); // redirect to sign-in
    }

    // if (!isPublicRoutes(req) && !isAuthenticated && process.env.NODE_ENV !== 'development') {
    //     return new NextResponse(null, { ok: false, status: 404 });
    // }

    if (isPublicRoute(req) && isAuthenticated && process.env.NODE_ENV !== 'development') {
        return NextResponse.redirect(new URL('/', req.url));
        // return new NextResponse(null, { ok: false, status: 404 });
    }

    // if (!isPublicRoute(req) && !isProtectedRoute(req) && !isPublicRoutes(req) && process.env.NODE_ENV !== 'development') {
    //     return new NextResponse(null, { ok: false, status: 404 });
        // return NextResponse.redirect(new URL('/', req.url));
    // }

    return NextResponse.next();
});

export const config = {
  matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
  ],
}
