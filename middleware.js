import { NextResponse } from 'next/server';

// Basic middleware to require auth (cookie `token`) for mutating API routes.
// Detailed role checks are enforced inside API handlers.
export function middleware(req) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // Only apply to specific API namespaces
  const protectedPrefixes = ['/api/events', '/api/attendance', '/api/notifications'];
  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));
  const isAuthRoute = pathname.startsWith('/api/auth');

  if (!isProtected || isAuthRoute) {
    return NextResponse.next();
  }

  // Only enforce on mutating methods
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const token = req.cookies.get('token');
    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  return NextResponse.next();
}

// Apply to all API routes, we filter inside
export const config = {
  matcher: ['/api/:path*']
};
