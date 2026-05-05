import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /marketview and /api/marketview routes
  if (pathname.startsWith('/marketview') || pathname.startsWith('/api/marketview')) {
    // Exclude login page and login API from protection
    if (pathname === '/marketview/login' || pathname === '/api/marketview/login') {
      return NextResponse.next();
    }

    const authCookie = request.cookies.get('marketview_auth');

    if (!authCookie || authCookie.value !== 'true') {
      // Redirect to login page if not authenticated
      if (pathname.startsWith('/api/marketview')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = new URL('/marketview/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/marketview/:path*', '/api/marketview/:path*'],
};
